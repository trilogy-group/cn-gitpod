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
    console.log(`extension-service serve hookpoint 3 called`);
    console.log("preStartImageBuildWorkspaceNotifyHook  ", call.request.toObject());

    // const request = call.request;
    // request.buildrequest?.forceRebuild
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

    console.log(`hookpoint3 - response: `, response.toObject());
    callback(null, response);
};

export { preStartImageBuildWorkspaceNotifyHook };
