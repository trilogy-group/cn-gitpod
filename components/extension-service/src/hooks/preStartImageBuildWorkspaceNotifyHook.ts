/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";

import {
    PreStartImageBuildWorkspaceNotifyRequest,
    PreStartImageBuildWorkspaceNotifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

const preStartImageBuildWorkspaceNotifyHook: grpc.handleUnaryCall<
    PreStartImageBuildWorkspaceNotifyRequest,
    PreStartImageBuildWorkspaceNotifyResponse
> = async (call, callback) => {
    const request = call.request;
    const response = new PreStartImageBuildWorkspaceNotifyResponse();

    const workspaceImageRef = request.getWorkspaceimageref();
    const buildId = request.getBuildid();

    let message: string = "";

    try {
        const wsInstance = await prismaClient?.workspaceInstance.findFirst({
            where: {
                workspaceImageRef,
                buildId,
            },
        });

        message = `Found wsInstance with id: ${wsInstance?.instanceId}`;
    } catch (err) {
        message = `Error finding by wsImageRef & buildId: ${err?.message}`;
    }

    response.setMessage(message);
    callback(null, response);
};

export { preStartImageBuildWorkspaceNotifyHook };
