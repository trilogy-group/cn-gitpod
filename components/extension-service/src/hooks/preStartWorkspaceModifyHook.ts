/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceModifyRequest, PreStartWorkspaceModifyResponse } from "@cn-gitpod/extension-service-api/lib";
import { prismaClient } from "../utils/prisma";
import { WorkspaceInstance } from "@prisma/client";

const preStartWorkspaceModifyHook: grpc.handleUnaryCall<
    PreStartWorkspaceModifyRequest,
    PreStartWorkspaceModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 1 called`);
    console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

    const request = call.request;
    const response = new PreStartWorkspaceModifyResponse();

    // ! previous implementation
    let message = ``;

    // let wsInstance: WorkspaceInstance;
    // // * save in db
    // try {
    //     wsInstance = await prismaClient.workspaceInstance.create({
    //         data: {
    //             instanceId: request.instance?.id,
    //             arch: request.workspace?.config?.arch,
    //         },
    //     });
    //     message = `Workspace instance id created with id: ${wsInstance.instanceId}`;
    // } catch (err) {
    //     message = `Error creating prisma create for id: ${request.instance?.id}`;
    // }

    // ! new implementation:
    const payload = request.getPayload();
    const instanceId = payload?.getInstance()?.getId();
    const arch = payload?.getWorkspace()?.getConfig()?.getArch();

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

    console.log(`hookpoint1 - : `, message);
    callback(null, response);
};

export { preStartWorkspaceModifyHook };
