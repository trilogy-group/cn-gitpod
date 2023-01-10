/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { inject, injectable } from "inversify";
import { ExtensionServiceClient } from "./service_grpc_pb";
import { PreStartWorkspaceNotifyRequest, PreStartWorkspaceNotifyResponse } from "./service_pb";
import * as grpc from "@grpc/grpc-js";

export const ExtensionServiceClientConfig = Symbol("ExtensionServiceClientConfig");

export interface ExtensionServiceClientConfig {
    address: string;
}

@injectable()
export class ExtensionServiceClientProvider {
    @inject(ExtensionServiceClientConfig) protected readonly clientConfig: ExtensionServiceClientConfig;

    // gRPC connections can be used concurrently, even across services.
    // Thus it makes sense to cache them rather than create a new connection for each request.
    protected connectionCache: PromisifiedExtensionServiceClient | undefined;

    getDefault() {
        const createClient = () => {
            return new PromisifiedExtensionServiceClient(
                new ExtensionServiceClient(this.clientConfig.address, grpc.credentials.createInsecure()),
            );
        };
        let connection = this.connectionCache;
        if (!connection) {
            connection = createClient();
        } else if (!connection.isConnectionAlive()) {
            connection.dispose();

            connection = createClient();
        }

        this.connectionCache = connection;
        return createClient();
    }

    async getClient() {
        return this.getDefault();
    }

    promisify(c: ExtensionServiceClient): PromisifiedExtensionServiceClient {
        return new PromisifiedExtensionServiceClient(
            new ExtensionServiceClient(this.clientConfig.address, grpc.credentials.createInsecure()),
        );
    }
}

export class PromisifiedExtensionServiceClient {
    constructor(public readonly client: ExtensionServiceClient) {}

    public isConnectionAlive() {
        const cs = this.client.getChannel().getConnectivityState(false);
        return (
            cs == grpc.connectivityState.CONNECTING ||
            cs == grpc.connectivityState.IDLE ||
            cs == grpc.connectivityState.READY
        );
    }

    public preStartWorkspaceNotifyHook(
        request: PreStartWorkspaceNotifyRequest,
    ): Promise<PreStartWorkspaceNotifyResponse> {
        return new Promise<PreStartWorkspaceNotifyResponse>((resolve, reject) => {
            // TODO: pass span to extension-service for better tracing
            this.client.preStartWorkspaceNotifyHook(request, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resp);
                }
            });
        });
    }

    public dispose() {
        this.client.close();
    }
}
