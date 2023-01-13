/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceNotifyRequest, PreStartWorkspaceNotifyResponse } from "@cn-gitpod/extension-service-api/lib";
import { prismaClient } from "../utils/prisma";
import { WorkspaceInstance } from "@prisma/client";

const preStartWorkspaceNotifyHook: grpc.handleUnaryCall<
    PreStartWorkspaceNotifyRequest,
    PreStartWorkspaceNotifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 1 called`);
    console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

    const request = call.request.toObject();
    const response = new PreStartWorkspaceNotifyResponse();
    let message = ``;

    let wsInstance: WorkspaceInstance;
    // * save in db
    try {
        wsInstance = await prismaClient.workspaceInstance.create({
            data: {
                instanceId: request.instance?.id,
                arch: request.workspace?.config?.arch,
            },
        });
        message = `Workspace instance id created with id: ${wsInstance.instanceId}`;
    } catch (err) {
        message = `Error creating prisma create for id: ${request.instance?.id}`;
    }

    console.log({ message });
    response.setMessage(message);

    callback(null, response);
};

export { preStartWorkspaceNotifyHook };
