/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */
/*
 * This is a Devspaces-specific file
 */

import * as crypto from "crypto";
import { inject, injectable } from "inversify";
import {
    CommitContext,
    StartWorkspaceResult,
    User,
    Workspace,
    WorkspaceInstance,
    Identity,
} from "@gitpod/gitpod-protocol";
import { CloneTargetMode, GitInitializer } from "@gitpod/content-service/lib";
import { DBWithTracing, TracedWorkspaceDB, WorkspaceDB } from "@gitpod/gitpod-db/lib";
import { log } from "@gitpod/gitpod-protocol/lib/util/logging";
import { TraceContext } from "@gitpod/gitpod-protocol/lib/util/tracing";
import { HostContextProvider } from "../auth/host-context-provider";
import { Config } from "../config";
import { SessionHandlerProvider } from "../session-handler";
import { TokenProvider } from "../user/token-provider";
import { MessageBusIntegration } from "./messagebus-integration";
import { URL } from "url";
import * as ec2 from "@aws-sdk/client-ec2";
import * as ssm from "@aws-sdk/client-ssm";
import * as http from "http";
import * as https from "https";

interface EC2WorkspaceInstance {
    workspaceId?: string;
    ec2InstanceId?: string;
}

const enum EC2InstanceStatus {
    UNDEFINED = -1,
    PENDING = 0,
    RUNNING = 16,
    SHUTTING_DOWN = 32,
    TERMINATED = 48,
    STOPPING = 64,
    STOPPED = 80,
}

interface EC2WorkspaceDetails {
    workspace: EC2WorkspaceInstance;
    ec2StatusCode: EC2InstanceStatus;
    ec2SystemStatus: boolean;
    ec2InstanceStatus: boolean;
}

@injectable()
export class EC2WorkspaceManager {
    @inject(Config) protected readonly config: Config;
    @inject(TracedWorkspaceDB) protected readonly workspaceDb: DBWithTracing<WorkspaceDB>;
    @inject(TokenProvider) protected readonly tokenProvider: TokenProvider;
    @inject(HostContextProvider) protected readonly hostContextProvider: HostContextProvider;
    @inject(MessageBusIntegration) protected readonly messageBus: MessageBusIntegration;
    @inject(SessionHandlerProvider) protected sessionHandlerProvider: SessionHandlerProvider;

    // Path to store all devspaces configuration files on the instance
    private readonly workspaceConfigDir = "~/.devspaces";

    private getWorkspaceUrlRegex(): RegExp {
        const raw_regex_pattern =
            "^https://windows-(?<IPAddress>[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3}-[0-9]{1,3})\\.ws\\." +
            this.config.hostUrl.url.host.replace(/\./gi, "\\.");
        return new RegExp(raw_regex_pattern);
    }

    public isEC2WorkspaceInstance(instance: WorkspaceInstance): boolean {
        return this.getWorkspaceUrlRegex().test(instance.ideUrl);
    }

    public async isEC2WorkspaceId(workspaceId: string): Promise<boolean> {
        const desc = await this.describeWorkspace(this.newEC2Client(), { workspaceId: workspaceId });
        // Desc will be undefined if this is not a real ec2 instance
        const statusCode: number = desc?.ec2StatusCode || EC2InstanceStatus.UNDEFINED;
        switch (statusCode) {
            case EC2InstanceStatus.PENDING:
            case EC2InstanceStatus.RUNNING:
            case EC2InstanceStatus.STOPPING:
            case EC2InstanceStatus.STOPPED:
                // Usable workspace, can be deleted
                return true;
            default:
                // Absent or already terminated
                return false;
        }
    }

    public async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private getWorkspaceInstanceAddress(instance: WorkspaceInstance): string | undefined {
        // TODO: When this URL pattern is deprecated, we shall use describeWorkspace instead.
        const ec2Regex = this.getWorkspaceUrlRegex();
        const match = instance.ideUrl.match(ec2Regex);
        return match?.[1]?.replace(/\-/gi, ".");
    }

    private newEC2Client(): ec2.EC2Client {
        return new ec2.EC2Client({
            credentials: {
                accessKeyId: this.config.windows.accessKey,
                secretAccessKey: this.config.windows.secretKey,
            },
            region: this.config.windows.region,
        });
    }

    protected getIdentityForHost(user: User, host: string): Identity {
        const authProviderId = this.getAuthProviderId(host);
        const hostIdentity = authProviderId && User.getIdentity(user, authProviderId);
        if (!hostIdentity) {
            throw new Error(`User ${user.name} has no identity for host: ${host}!`);
        }
        return hostIdentity;
    }

    protected getAuthProviderId(host: string): string | undefined {
        const hostContext = this.hostContextProvider.get(host);
        if (!hostContext) {
            return undefined;
        }
        return hostContext.authProvider.authProviderId;
    }

    protected getSessionCredentials(user: User): string {
        const apiSessionID = this.sessionHandlerProvider.createAPISession(user.id);
        log.debug(`Created new API session with ID ${apiSessionID}`);

        // Sign the session
        const apiKeySignature = crypto
            .createHmac("sha256", this.config.session.secret)
            .update(apiSessionID)
            .digest("base64")
            .replace(/\=+$/, "");

        // Session cookie for API access
        const signedSessionKey = SessionHandlerProvider.getCookieName(this.config);
        const signedSessionValue = encodeURIComponent(`s:${apiSessionID}.${apiKeySignature}`);
        const apiCredentials = `gitpod-user=loggedIn; ${signedSessionKey}=${signedSessionValue}`;
        return apiCredentials;
    }

    protected async findNamedAMI(ec2client: ec2.EC2Client, amiName: string): Promise<string> {
        const findAMIParams: ec2.DescribeImagesCommandInput = {
            Filters: [
                {
                    Name: "name",
                    Values: [amiName],
                },
            ],
        };

        const findAMICmd = new ec2.DescribeImagesCommand(findAMIParams);
        const findAMIRes = await ec2client.send(findAMICmd);

        const imageId = findAMIRes?.Images?.[0]?.ImageId;
        if (!imageId) {
            // Abort if no image matches the requested name
            throw new Error(`Could not find AMI named '${amiName}'`);
        }

        return imageId;
    }

    protected async findNamedInstance(ec2client: ec2.EC2Client, instanceName?: string): Promise<string | undefined> {
        if (!instanceName) {
            return undefined;
        }

        const args: ec2.DescribeInstancesCommandInput = {
            Filters: [
                {
                    Name: "tag:Name",
                    Values: [instanceName],
                },
            ],
        };

        const command = new ec2.DescribeInstancesCommand(args);
        const response = await ec2client.send(command);

        let bestMatch: string | undefined;

        // Find the first running instance with this name.
        // If no running match is found, return any id that matched the tag, preferrably one that is not terminated.
        response.Reservations?.forEach((reservation) => {
            reservation.Instances?.forEach((instance) => {
                switch (instance.State?.Code) {
                    case EC2InstanceStatus.PENDING:
                    case EC2InstanceStatus.RUNNING:
                        return instance.InstanceId;
                    case EC2InstanceStatus.STOPPING:
                    case EC2InstanceStatus.STOPPED:
                        bestMatch = instance.InstanceId;
                        break;
                }
            });
        });

        return bestMatch;
    }

    protected async describeWorkspace(
        ec2client: ec2.EC2Client,
        workspace: EC2WorkspaceInstance,
    ): Promise<EC2WorkspaceDetails | undefined> {
        const instanceId = workspace.ec2InstanceId || (await this.findNamedInstance(ec2client, workspace.workspaceId));
        if (!instanceId) {
            return undefined;
        }

        const params: ec2.DescribeInstanceStatusCommandInput = {
            InstanceIds: [instanceId],
            IncludeAllInstances: true,
        };

        const getInstanceStatusCommand = new ec2.DescribeInstanceStatusCommand(params);
        const status = await ec2client.send(getInstanceStatusCommand);
        const code = status.InstanceStatuses?.[0]?.InstanceState?.Code || EC2InstanceStatus.UNDEFINED;

        return {
            workspace: { ec2InstanceId: instanceId, workspaceId: workspace.workspaceId },
            ec2StatusCode: code,
            ec2SystemStatus: status.InstanceStatuses?.[0]?.SystemStatus?.Status == "ok",
            ec2InstanceStatus: status.InstanceStatuses?.[0]?.InstanceStatus?.Status == "ok",
        };
    }

    protected async getWorkspaceIdeUrl(ec2client: ec2.EC2Client, workspace: EC2WorkspaceInstance): Promise<string> {
        const instanceId = workspace.ec2InstanceId || (await this.findNamedInstance(ec2client, workspace.workspaceId));
        if (!instanceId) {
            throw new Error(`Workspace not found: ${workspace}`);
        }

        const params: ec2.DescribeInstancesCommandInput = {
            InstanceIds: [instanceId],
        };

        const command = new ec2.DescribeInstancesCommand(params);
        const response = await ec2client.send(command);
        const workspaceIp = response.Reservations![0].Instances![0].PrivateIpAddress!.replace(/\./gi, "-");
        return "https://windows-" + workspaceIp + ".ws." + this.config.hostUrl.url.host;
    }

    protected async waitForCommand(ssmClient: ssm.SSMClient, command: ssm.Command): Promise<ssm.CommandStatus> {
        const params: ssm.ListCommandsCommandInput = {
            CommandId: command.CommandId,
        };

        const cmd = new ssm.ListCommandsCommand(params);
        let status: ssm.CommandStatus = ssm.CommandStatus.PENDING;

        do {
            const response = await ssmClient.send(cmd);
            status = <ssm.CommandStatus>(response.Commands?.[0].Status || ssm.CommandStatus.PENDING);

            await this.delay(5000);
        } while (status == ssm.CommandStatus.PENDING || status == ssm.CommandStatus.IN_PROGRESS);
        return status;
    }

    protected async runCommand(
        ctx: TraceContext,
        instance: EC2WorkspaceInstance,
        commands: string[],
        wait: boolean,
        timeout?: number,
    ): Promise<ssm.CommandStatus> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.runCommand", ctx);

        try {
            const ec2client = this.newEC2Client();
            const instanceId =
                instance.ec2InstanceId || (await this.findNamedInstance(ec2client, instance.workspaceId));

            if (!instanceId) {
                throw new Error("Could not find workspace instance to execute commands.");
            }

            // Connect using system manager and execute script
            const ssmClient = new ssm.SSMClient({
                credentials: {
                    accessKeyId: this.config.windows.accessKey,
                    secretAccessKey: this.config.windows.secretKey,
                },
                region: this.config.windows.region,
            });

            const params: ssm.SendCommandCommandInput = {
                InstanceIds: [instanceId],
                DocumentName: "AWS-RunPowerShellScript",
                DocumentVersion: "1",
                TimeoutSeconds: timeout,
                Parameters: {
                    commands: commands,
                },
            };

            const command = new ssm.SendCommandCommand(params);
            const response = await ssmClient.send(command);

            if (wait) {
                return await this.waitForCommand(ssmClient, response.Command!);
            }

            return ssm.CommandStatus.IN_PROGRESS;
        } catch (error) {
            log.error("Error executing commands.", error);
            return ssm.CommandStatus.FAILED;
        } finally {
            span.finish();
        }
    }

    protected async createWorkspaceInitScript(
        workspace: Workspace,
        instance: WorkspaceInstance,
        user: User,
        git: GitInitializer,
        checkoutLoc: string,
    ): Promise<string[]> {
        if (!CommitContext.is(workspace.context)) {
            throw new Error("Could not identify commit context");
        }

        const host = workspace.context.repository.host;
        const identity = await this.getIdentityForHost(user, host);
        const token = await this.tokenProvider.getTokenForHost(user, host);
        const git_user = identity.authName || "missing";
        const git_pass = token.value;
        const git_email = identity.primaryEmail!;

        // Generate API access credentials for the workspace supervisor
        const apiCredentials = this.getSessionCredentials(user);

        // Git configuration. Sets up github username, email and sets the credential helper to 'store'
        const gitconfig = `[user]\`n\`temail = ${git_email}\`n\`tname = ${
            user.fullName || git_user
        }\`n[credential]\`n\`thelper = store`;
        const ghclone = git.getRemoteUri();

        var script = [
            // Write git config to the target home directory
            `echo "https://${git_user}:${git_pass}@github.com" | out-file -nonewline -encoding ASCII ~/.git-credentials;`,
            `echo "${gitconfig}" | out-file -nonewline -encoding ASCII ~/.gitconfig;`,
            // Write gitpod configuration to the workspace config directory
            `echo ${this.config.hostUrl.url.host} | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.gitpod-domain;`,
            `echo '${apiCredentials}' | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.gitpod-credentials;`,
            `echo '${workspace.id}' | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.gitpod-id;`,
            `echo '${instance.id}' | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.instance-id;`,
            // Prepare for repository checkout
            "cd /Workspace;",
            `$env:GIT_REDIRECT_STDERR = '2>&1';`,
            `mkdir ${checkoutLoc};`,
            `cd ${checkoutLoc};`,
            "start-sleep 2;",
        ];

        const target = git.getCloneTaget();
        switch (git.getTargetMode()) {
            case CloneTargetMode.REMOTE_HEAD:
                script.push(`git clone -q ${ghclone} --single-branch .`);
                break;
            case CloneTargetMode.REMOTE_COMMIT:
                script.push(`git clone -q -n ${ghclone} .`);
                script.push(`git checkout ${target}`);
                break;
            case CloneTargetMode.REMOTE_BRANCH:
                script.push(`git clone -q ${ghclone} -b ${target} --single-branch .`);
                break;
            case CloneTargetMode.LOCAL_BRANCH:
                script.push(`git clone -q ${ghclone} .`);
                script.push(`git checkout -q -b ${target}`);
                break;
        }

        const upstreamUri = git.getUpstreamRemoteUri();
        if (upstreamUri && upstreamUri != "") {
            script.push(`git remote add upstream ${upstreamUri};`, "git fetch upstream;");
        }

        script.push("git submodule update --init --recursive;");
        script.push("Invoke-RunGitpodTasks");
        return script;
    }

    protected async testWorkspaceReachability(
        workspaceURL: URL,
        desiredStatus?: boolean,
        timeoutMS?: number,
    ): Promise<boolean> {
        log.debug(`testWorkspaceReachability(${workspaceURL})`);
        const start = Date.now();

        do {
            const reachable = await new Promise<boolean>((resolve) => {
                const req = https.request({
                    hostname: workspaceURL.hostname,
                    port: 443,
                    path: "/",
                    method: "GET",
                });
                req.on("error", () => {
                    resolve(false);
                });
                req.on("response", (response) => {
                    const code = response.statusCode || 404;
                    resolve(code < 400);
                });
                req.end();
            });

            if (typeof desiredStatus == "undefined" || reachable == desiredStatus) {
                // If no desired status was declared, just return the current reachability status
                return reachable;
            }

            // Wait some time before trying again
            await this.delay(5000);
        } while (!timeoutMS || Date.now() - start < timeoutMS);

        return !desiredStatus;
    }

    protected async resumeWorkspace(
        ctx: TraceContext,
        ec2client: ec2.EC2Client,
        instance: WorkspaceInstance,
        ec2Instance: EC2WorkspaceInstance,
        user: User,
    ): Promise<string | undefined> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.resumeWorkspace", ctx);

        try {
            // Set workspace status to initializing
            instance = await this.workspaceDb
                .trace({ span })
                .updateInstancePartial(instance.id, { status: { phase: "initializing", conditions: {} } });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);

            // Kick the instance
            const params = {
                InstanceIds: [ec2Instance.ec2InstanceId!],
            };

            const command = new ec2.StartInstancesCommand(params);
            const response = await ec2client.send(command);

            if (!response.StartingInstances?.[0]) {
                throw new Error(`Failed to resume instance ${ec2Instance.ec2InstanceId!}`);
            }

            // Wait for instance to spin up
            await this.delay(30 * 1000);

            // Get a workspace URL and wait for it to come online
            const workspaceUrl = await this.getWorkspaceIdeUrl(ec2client, ec2Instance);
            const reachable = await this.testWorkspaceReachability(new URL(workspaceUrl), true, 5 * 60 * 1000);

            if (reachable) {
                // Initialize the workspace with a refreshed session token
                const apiCredentials = this.getSessionCredentials(user);
                const bootstrapCommands: string[] = [
                    `echo '${apiCredentials}' | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.gitpod-credentials;`,
                    `echo '${instance.id}' | out-file -nonewline -encoding ASCII ${this.workspaceConfigDir}/.instance-id;`,
                ];

                const start = Date.now();
                let initStatus: ssm.CommandStatus;

                do {
                    initStatus = await this.runCommand(
                        ctx,
                        { ec2InstanceId: ec2Instance.ec2InstanceId },
                        bootstrapCommands,
                        true,
                    );
                    if (initStatus == ssm.CommandStatus.SUCCESS) {
                        break;
                    }

                    await this.delay(10 * 1000);
                } while (Date.now() - start < 2 * 60 * 1000);

                if (initStatus != ssm.CommandStatus.SUCCESS) {
                    throw new Error(`Workspace initialization failed with error '${initStatus}'`);
                }

                return workspaceUrl;
            }

            // Workspace could not be reached in 5 minutes
            throw new Error("Workspace instance is unreachable.");
        } catch (error) {
            // Terminate the existing instance
            log.error("Resuming workspace failed.", error);
            if (ec2Instance.ec2InstanceId) {
                await this.terminateWorkspace(ec2client, ec2Instance.ec2InstanceId);
            }

            // Roll back the state change
            instance = await this.workspaceDb
                .trace({ span })
                .updateInstancePartial(instance.id, { status: { phase: "creating", conditions: {} } });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);
        } finally {
            span.finish();
        }

        return undefined;
    }

    protected async newWorkspaceInternal(
        ctx: TraceContext,
        ec2client: ec2.EC2Client,
        workspace: Workspace,
        instance: WorkspaceInstance,
        user: User,
        git: GitInitializer,
    ): Promise<string> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.newWorkspaceInternal", ctx);

        try {
            const amiName: string = workspace.config.windowsConfig?.amiName || this.config.windows.amiName;
            const amiId: string =
                workspace.config.windowsConfig?.amiId || (await this.findNamedAMI(ec2client, amiName));
            const instanceType: string =
                workspace.config.windowsConfig?.instanceType || this.config.windows.instanceType;
            const subnetId: string = workspace.config.windowsConfig?.subnetId || this.config.windows.subnetId;
            const securityGroupIds: string[] =
                workspace.config.windowsConfig?.securityGroupIds || this.config.windows.securityGroupIds.split(",");

            // Create instance.
            let instanceParams: ec2.RunInstancesCommandInput = {
                ImageId: amiId,
                InstanceType: instanceType,
                BlockDeviceMappings: [
                    {
                        DeviceName: "/dev/sda1",
                        Ebs: {
                            VolumeType: "gp3",
                            Iops: 16000,
                            Throughput: 1000,
                        },
                    },
                ],
                MinCount: 1,
                MaxCount: 1,
                TagSpecifications: [
                    {
                        ResourceType: "instance",
                        Tags: [
                            {
                                Key: "Name",
                                Value: workspace.id,
                            },
                            {
                                Key: "Devspaces-Host",
                                Value: this.config.hostUrl.url.host,
                            },
                        ],
                    },
                ],
                SubnetId: subnetId,
                SecurityGroupIds: securityGroupIds,
                IamInstanceProfile: {
                    Name: this.config.windows.instanceRole,
                },
            };

            const createEc2Cmd = new ec2.RunInstancesCommand(instanceParams);
            const createRes = await ec2client.send(createEc2Cmd);
            const ec2InstanceId = createRes.Instances![0].InstanceId!;

            // Wait for instance to change to running
            await this.delay(10000); // Initial 10-second delay
            const workspaceUrl = await this.getWorkspaceIdeUrl(ec2client, { ec2InstanceId: ec2InstanceId });

            const checkoutLoc = git.getCheckoutLocation() || (workspace.context as CommitContext).repository.name;
            const scriptCommands = await this.createWorkspaceInitScript(workspace, instance, user, git, checkoutLoc);
            const bootstrapCommands: string[] = [
                `$WorkspaceInitScript = @'\n${scriptCommands.join("\n")}\n'@;`,
                `Set-Content -Path ${this.workspaceConfigDir}/.workspace-init.ps1 -Encoding ASCII -Value $WorkspaceInitScript;`,
                `Invoke-RunInitTask 'EC2Launch' '& ${this.workspaceConfigDir}/.workspace-init.ps1 2>&1';`,
                `if (Help Watch-InitTask | Select-String 'Wait') { Watch-InitTask EC2Launch -Wait } else { Start-Sleep 10; Watch-InitTask EC2Launch };`, // Waits for checkout to finish. Older AMIs do not support the 'Wait' option
            ];

            let donePending = false;
            let workspaceReachable = false;
            let bootstrapAttempts = 0;
            let waitDurationMs = 5000;

            while (true) {
                const details = await this.describeWorkspace(ec2client, { ec2InstanceId: ec2InstanceId });

                if (details?.ec2StatusCode == EC2InstanceStatus.RUNNING && !donePending) {
                    // Update instance status if the system is ready
                    donePending = true;
                    instance = await this.workspaceDb
                        .trace({ span })
                        .updateInstancePartial(instance.id, { status: { phase: "initializing", conditions: {} } });
                    await this.messageBus.notifyOnInstanceUpdate(user.id, instance);
                }

                if (details?.ec2StatusCode == EC2InstanceStatus.RUNNING && details?.ec2SystemStatus) {
                    // Wait for the instance to be ready. EC2 is very slow to update the status of this field, probe manually in case of negative result.
                    const instanceReady = details?.ec2InstanceStatus;
                    workspaceReachable =
                        workspaceReachable ||
                        (await this.testWorkspaceReachability(new URL("https://" + workspaceUrl)));

                    if (instanceReady || workspaceReachable) {
                        // Space out the requests a bit more, the instance already started successfully
                        waitDurationMs = 10000;

                        // Try to execute the bootstrap code
                        const initStatus = await this.runCommand(
                            ctx,
                            { ec2InstanceId: ec2InstanceId },
                            bootstrapCommands,
                            true,
                        );
                        if (initStatus == ssm.CommandStatus.SUCCESS) {
                            log.debug("Bootstrap sequence completed successfully.");
                            break;
                        }

                        if (instanceReady) {
                            if (bootstrapAttempts++ >= 3) {
                                log.error(
                                    `Failed to initialize instance ${ec2InstanceId}. Will terminate the instance.`,
                                );
                                await this.terminateWorkspace(ec2client, ec2InstanceId);
                                throw new Error("Workspace initialization commands failed to complete successfully");
                            }
                        }
                    }
                }

                await this.delay(waitDurationMs);
            }

            return workspaceUrl;
        } finally {
            span.finish();
        }
    }

    public async startWorkspace(
        ctx: TraceContext,
        workspace: Workspace,
        user: User,
        instanceId: string,
        git: GitInitializer,
    ): Promise<StartWorkspaceResult> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.startWorkspace", ctx);

        try {
            let instance = await this.workspaceDb.trace({ span }).updateInstancePartial(instanceId, {
                region: this.config.windows.region,
                status: { phase: "creating", conditions: {} },
            });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);

            const checkoutLoc = git.getCheckoutLocation() || (workspace.context as CommitContext).repository.name;
            const ec2client = this.newEC2Client();

            const prevInstance = await this.describeWorkspace(ec2client, { workspaceId: workspace.id });
            const prevInstanceId = prevInstance?.workspace?.ec2InstanceId;

            let workspaceUrl: string | undefined;

            if (prevInstanceId) {
                // Try to wake and resume this workspace
                log.info(`Pre-existing workspace instance with ec2 ID ${prevInstanceId} was found.`);
                workspaceUrl = await this.resumeWorkspace(
                    ctx,
                    ec2client,
                    instance,
                    { ec2InstanceId: prevInstanceId },
                    user,
                );
            }

            if (!workspaceUrl) {
                workspaceUrl = await this.newWorkspaceInternal(ctx, ec2client, workspace, instance, user, git);
            }

            instance = await this.workspaceDb.trace({ span }).updateInstancePartial(instance.id, {
                startedTime: new Date().toISOString(),
                ideUrl:
                    workspaceUrl +
                    `/?folder=vscode-remote%3A%2F%2Flocalhost%3A${this.config.windows.vscodePort}%2FWorkspace%2F` +
                    checkoutLoc,
                status: { phase: "running", conditions: {} },
            });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);
        } catch (err) {
            log.error(
                { workspaceId: workspace.id, instanceId, userId: workspace.ownerId },
                "Got error during launchWindowsWorkspace",
                err,
            );
            const instance = await this.workspaceDb.trace({ span }).updateInstancePartial(instanceId, {
                status: { phase: "stopped", conditions: { failed: err.toString() } },
            });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);
        } finally {
            span.finish();
        }

        return { instanceID: instanceId };
    }

    protected async requestGracefulShutdown(instance: WorkspaceInstance): Promise<boolean> {
        log.debug("Stop windows instance: " + instance.workspaceId);

        const hostaddr = this.getWorkspaceInstanceAddress(instance);
        if (!hostaddr) {
            log.warn("Could not retrieve instance address.");
            return false;
        }

        // Make a request to the supervisor 'stop-workspace' endpoint
        const stopped = await new Promise<boolean>((resolve) => {
            const req = http.request({
                hostname: hostaddr,
                port: 29999,
                path: "/stop-workspace",
                method: "GET",
            });
            req.on("error", () => resolve(false));
            req.on("response", (response: any) => resolve(response.statusCode == 200));
            req.end();
        });

        log.debug("Workspace received stop request? " + stopped);

        // Let's wait for the server to go down
        const hostname_end =
            instance.ideUrl.indexOf(this.config.hostUrl.url.host) + this.config.hostUrl.url.host.length;
        const hostpath = instance.ideUrl.substring(0, hostname_end);
        const reachable = await this.testWorkspaceReachability(new URL(hostpath), false, 90000);
        log.debug("Is workspace still reachable? " + reachable);

        // If we succeeded, the server should not be reachable
        return !reachable;
    }

    protected async terminateWorkspace(ec2client: ec2.EC2Client, awsInstanceId: string): Promise<void> {
        const args: ec2.TerminateInstancesCommandInput = {
            InstanceIds: [awsInstanceId],
        };

        const stopRequest = new ec2.TerminateInstancesCommand(args);
        const response = await ec2client.send(stopRequest);

        // We do not need to wait for the instance to go down, once it is flagged as stopping we can proceed
        if (!response.TerminatingInstances) {
            log.error(`Workspace could not be stopped. Instance ID ${awsInstanceId}`);
        }
    }

    public async stopWorkspace(ctx: TraceContext, workspaceInstance: WorkspaceInstance, user: User): Promise<void> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.stopWorkspace", ctx);

        try {
            let instance = await this.workspaceDb.trace({ span }).updateInstancePartial(workspaceInstance.id, {
                stoppingTime: new Date().toISOString(),
                status: { phase: "stopping", conditions: {} },
            });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);

            const ec2client = this.newEC2Client();
            let instanceDestroyed = false;
            let instanceStopped = false;

            try {
                await this.requestGracefulShutdown(instance);
            } catch (error) {
                log.error("Graceful shutdown request failed. Will force close if needed.", error);
            }

            // Observe what the workspace is doing. It should exit running status within 60 seconds
            const start = Date.now();
            do {
                await this.delay(5000);
                const details = await this.describeWorkspace(ec2client, { workspaceId: workspaceInstance.workspaceId });
                const status = details?.ec2StatusCode || EC2InstanceStatus.UNDEFINED;

                switch (status) {
                    case EC2InstanceStatus.SHUTTING_DOWN:
                    case EC2InstanceStatus.TERMINATED:
                        instanceDestroyed = true;
                        break;
                    case EC2InstanceStatus.STOPPING:
                    case EC2InstanceStatus.STOPPED:
                        instanceStopped = true;
                        break;
                }
            } while (Date.now() - start < 60 * 1000);

            if (!instanceDestroyed && !instanceStopped) {
                const awsInstanceId = await this.findNamedInstance(ec2client, instance.id);

                if (awsInstanceId) {
                    this.terminateWorkspace(ec2client, awsInstanceId);
                } else {
                    log.error(`Workspace ${instance.workspaceId} could not be found. Is it really running?`);
                }
            }

            instance = await this.workspaceDb.trace({ span }).updateInstancePartial(instance.id, {
                stoppedTime: new Date().toISOString(),
                status: { phase: "stopped", conditions: {} },
            });
            await this.messageBus.notifyOnInstanceUpdate(user.id, instance);
        } catch (error) {
            log.error("Workspace stop failed.", error);
        } finally {
            span.finish();
        }
    }

    public async deleteWorkspace(workspaceId: string): Promise<boolean> {
        const span = TraceContext.startSpan("EC2WorkspaceManager.deleteWorkspace", {});
        log.debug(`Workspace deletion was requested for ID ${workspaceId}`);

        const ec2client = this.newEC2Client();
        try {
            let ec2InstanceId = await this.findNamedInstance(ec2client, workspaceId);
            if (!ec2InstanceId) {
                throw new Error(`No such instance ${workspaceId}`);
            }

            await this.terminateWorkspace(ec2client, ec2InstanceId);
            await this.workspaceDb
                .trace({ span })
                .updatePartial(workspaceId, { contentDeletedTime: new Date().toISOString() });
            return true;
        } catch (error) {
            log.error("Workspace deletion failed.", error);
            return false;
        } finally {
            span.finish();
        }
    }
}
