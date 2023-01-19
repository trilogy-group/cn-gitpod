/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceModifyRequest, PreStartWorkspaceModifyResponse } from "@cn-gitpod/extension-service-api/lib";
import { prismaClient } from "../utils/prisma";
import { WorkspaceInstance } from "@prisma/client";
import { Arch, swapTagWithDigest } from "../utils/digest";

const preStartWorkspaceModifyHook: grpc.handleUnaryCall<
    PreStartWorkspaceModifyRequest,
    PreStartWorkspaceModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 1 called`);
    console.log("preStartWorkspaceNotifyHookHandler", JSON.stringify(call.request.toObject(), null, 1));

    const request = call.request;
    const response = new PreStartWorkspaceModifyResponse();

    // ! previous implementation
    let message = ``;

    // ! new implementation:
    const payload = request.getPayload();
    const instanceId = payload?.getInstance()?.getId();
    const arch = payload?.getWorkspace()?.getConfig()?.getArch() as Arch;

    // TODO: imageSource image:tag -> image@sha...
    // payload?.getWorkspace()?.getConfig()?.getImage()?.getConfigstring();
    // payload?.getWorkspace()?.getConfig()?.getImage()?.getConfigfile()?.getFile();

    // ! if configstring is present, swap tag with digest
    if (payload?.getWorkspace()?.getConfig()?.getImage()?.hasConfigstring()) {
        const configString = payload?.getWorkspace()?.getConfig()?.getImage()?.getConfigstring()!;
        const newConfigString = await swapTagWithDigest(configString, arch);
        payload?.getWorkspace()?.getConfig()?.getImage()?.setConfigstring(newConfigString);
    }

    // * save in db
    let wsInstance: WorkspaceInstance;
    try {
        wsInstance = await prismaClient.workspaceInstance.create({
            data: {
                instanceId,
                arch,
            },
        });
        message = `Workspace instance id created with id: ${wsInstance.instanceId}`;
    } catch (err) {
        message = `Error creating prisma create for id: ${instanceId}`;
        response.setError(err?.message || message);
    }

    response.setPayload(payload);
    response.setError("");

    console.log(`hookpoint1 - message: `, message);
    console.log(`hookpoint1 - response: `, JSON.stringify(response.toObject(), null, 1));
    callback(null, response);
};

export { preStartWorkspaceModifyHook };
