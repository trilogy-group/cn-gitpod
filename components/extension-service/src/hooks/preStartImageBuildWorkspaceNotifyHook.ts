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

import { getPayloadHash } from "../utils/hash";

const preStartImageBuildWorkspaceNotifyHook: grpc.handleUnaryCall<
    PreStartImageBuildWorkspaceNotifyRequest,
    PreStartImageBuildWorkspaceNotifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 3 called`);
    console.log("preStartImageBuildWorkspaceNotifyHook  ", JSON.stringify(call.request.toObject(), null, 1));

    const request = call.request;
    const response = new PreStartImageBuildWorkspaceNotifyResponse();

    // ! updated implementation
    const buildRequest = request.getBuildrequest();
    const buildId = request.getBuildid();

    const hash = getPayloadHash(buildRequest);

    let message: string;
    try {
        const hashArch = await prismaClient?.hashArch.findUnique({
            where: {
                hash,
            },
        });
        console.log(`hookpoint 3 - Got hasharch: `, hashArch)
        const wsInstance = await prismaClient?.workspaceInstance.create({
            data: {
                instanceId: buildId,
                arch: hashArch?.arch,
            },
        });
        message = `Hookpoint3 - created wsInstance with id: ${wsInstance?.instanceId}, arch: ${wsInstance?.arch}`;
        response.setError("");
    } catch (err) {
        message = `Error finding by wsImageRef & buildId: ${err?.message}`;
        response.setError(message);
    }

    console.log(`hookpoint3 - message: `, message);
    console.log(`hookpoint3 - response: `, JSON.stringify(response.toObject(), null, 1));
    callback(null, response);
};

export { preStartImageBuildWorkspaceNotifyHook };
