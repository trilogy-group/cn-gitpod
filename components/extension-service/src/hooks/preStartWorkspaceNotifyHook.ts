/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceNotifyRequest, PreStartWorkspaceNotifyResponse } from "@cn-gitpod/extension-service-api/lib";
import { prismaClient } from "../utils/prisma";

// ! original:
// const preStartWorkspaceNotifyHookHandler: grpc.handleUnaryCall<
//     PreStartWorkspaceNotifyRequest,
//     PreStartWorkspaceNotifyResponse
// > = (call, callback) => {
//     console.log(`extension-service server: preStartWorkspaceNotifyHookHandler`);
//     console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

//     const request = call.request.toObject();
//     const response = new PreStartWorkspaceNotifyResponse();
//     let message = ``;

//     // * save in db
//     prismaClient.workspaceInstance
//         .create({
//             data: {
//                 instanceId: request.instance?.id,
//                 arch: request.workspace?.config?.arch,
//             },
//         })
//         .then((data) => {
//             message = `Workspace instance id created with id: ${data.instanceId}`;
//             response.setMessage(message);
//         })
//         .catch((err) => {
//             message = `Error creating prisma create for id: ${request.instance?.id}`;
//             response.setMessage(message);
//         })
//         .finally(() => {
//             callback(null, response);
//         });
// };

// ! async-await test:
const preStartWorkspaceNotifyHookHandler: grpc.handleUnaryCall<
    PreStartWorkspaceNotifyRequest,
    PreStartWorkspaceNotifyResponse
> = async (call) => {
    console.log(`extension-service server: preStartWorkspaceNotifyHookHandler`);
    console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

    const request = call.request.toObject();
    const response = new PreStartWorkspaceNotifyResponse();
    let message = ``;

    try {
        // save in db
        const data = await prismaClient.workspaceInstance.create({
            data: {
                instanceId: request.instance?.id,
                arch: request.workspace?.config?.arch,
            },
        });
        message = `Workspace instance id created with id: ${data.instanceId}`;
    } catch (err) {
        message = `Error creating prisma create for id: ${request.instance?.id}`;
    }

    response.setMessage(message);
    return response;
};

export { preStartWorkspaceNotifyHookHandler };
