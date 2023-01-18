/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import {
    PreCallImageBuilderModifyRequest,
    PreCallImageBuilderModifyResponse,
} from "@cn-gitpod/extension-service-api/lib";
// import { prismaClient } from "../utils/prisma";

const preCallImageBuilderModifyHook: grpc.handleUnaryCall<
    PreCallImageBuilderModifyRequest,
    PreCallImageBuilderModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 2 called`);
    console.log("preCallImageBuilderModifyHook", call.request.toObject());

    const request = call.request;
    const response = new PreCallImageBuilderModifyResponse();

    // ! previous implementation
    // const workspaceImageRef = request.getWorkspaceimageref();
    // const instanceId = request.getInstance()?.getId();

    // let message: string;
    // try {
    //     // ! we have to update table2 via 1. First we fetch 1
    //     const wsInstance = await prismaClient.workspaceInstance.findUnique({
    //         where: {
    //             instanceId,
    //         },
    //     });
    //     if (!wsInstance) {
    //         message = `Could not find wsInstance with id: ${instanceId}`;
    //     } else {
    //         // const imageRef = await prismaClient
    //         const imageRef = await prismaClient.imageRefArch.upsert({
    //             where: {
    //                 workspaceImageRef,
    //             },
    //             create: {
    //                 workspaceImageRef,
    //                 arch: wsInstance.arch,
    //             },
    //             update: {
    //                 arch: wsInstance.arch,
    //             },
    //         });
    //         message = `Upserted image with ref: ${imageRef.workspaceImageRef}`;
    //     }
    // } catch (err) {
    //     message = `Error upserting wsInstnace, err: ${err?.message}`;
    // }

    // console.log(`hookpoint2 response: `, { message });
    // response.setMessage(message);

    // ! updated implementation:
    const payload = request.getPayload();

    const buildRequest = payload?.getBuildrequest();
    const wsInstance = payload?.getInstance();

    // buildRequest?.getSource() -> unique hash
    // ! if input is of form ref -> simply store it
    buildRequest?.getSource()?.getRef()?.getRef();

    // only compute hash for this case:
    buildRequest?.getSource()?.getFile();

    try {
    } catch (err) {}

    console.log(`hookpoint2 - response: `, response.toObject());
    response.setPayload(payload);
    callback(null, response);
};

export { preCallImageBuilderModifyHook };
