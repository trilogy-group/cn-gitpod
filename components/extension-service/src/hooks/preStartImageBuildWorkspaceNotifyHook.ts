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
    console.log("preStartImageBuildWorkspaceNotifyHook  ", call.request.toObject());

    const request = call.request;
    const response = new PreStartImageBuildWorkspaceNotifyResponse();

    // const workspaceImageRef = request.getWorkspaceimageref();
    // const buildId = request.getBuildid();

    // let message: string = "";

    // try {
    //     const imageRef = await prismaClient?.imageRefArch.findUnique({
    //         where: {
    //             workspaceImageRef,
    //         },
    //     });
    //     const wsInstance = await prismaClient?.workspaceInstance.create({
    //         // where: {
    //         //     instanceId: buildId,
    //         // },
    //         data: {
    //             instanceId: buildId,
    //             arch: imageRef?.arch,
    //         },
    //     });

    //     message = `Hookpoint3 - created wsInstance with id: ${wsInstance?.instanceId}, arch: ${wsInstance?.arch}`;
    // } catch (err) {
    //     message = `Error finding by wsImageRef & buildId: ${err?.message}`;
    // }

    // console.log(`hookpoint3 response: `, { message });
    // response.setMessage(message);

    // so how we stored it in hookpoint 2, we fetch again here in the same way

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
    console.log(`hookpoint3 - response: `, response.toObject());
    callback(null, response);
};

export { preStartImageBuildWorkspaceNotifyHook };
