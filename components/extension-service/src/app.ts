/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import {
    ExtensionServiceService,
    PreStartWorkspaceNotifyRequest,
    PreStartWorkspaceNotifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

const server = new grpc.Server();

// ! Handler, move to new file
const preStartWorkspaceNotifyHookHandler: grpc.handleUnaryCall<
    PreStartWorkspaceNotifyRequest,
    PreStartWorkspaceNotifyResponse
> = (call, callback) => {
    console.log(`extension-service server: preStartWorkspaceNotifyHookHandler`);
    console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

    const response = new PreStartWorkspaceNotifyResponse();
    response.setMessage("This is a custom message from the response");
    callback(null, response);
};

// * adding services
server.addService(ExtensionServiceService, {
    preStartWorkspaceNotifyHook: preStartWorkspaceNotifyHookHandler,
});

server.bindAsync("0.0.0.0:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    server.start();
    console.log(`🚀 Server listening on ${port}`);
});
