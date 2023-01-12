/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import {
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

const postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse
> = async (call, callback) => {
    console.log(`extension-service server: postCreateWorkspacePodModifyHookHandler`);
    console.log("postCreateWorkspacePodModifyHookHandler", call.request.toObject());
    const response = new PostCreateWorkspacePodModifyResponse();
    const pod = call.request.getPod();
    const podMetadata = pod?.getMetadata();
    const podMetadataAnnotations = podMetadata?.getAnnotationsMap();
    const instanceId = call.request.getWorkspaceinstanceid();

    // * check from prisma
    const foundWSInstance = await prismaClient?.workspaceInstance.findUnique({
        where: {
            instanceId,
        },
    });
    if (!foundWSInstance) {
        console.log(`WS Instance not found in prisma with id: ${instanceId}`);
        podMetadataAnnotations?.set("hookArch", "Hi i am x86");
    } else {
        console.log(`Found WS Instance in prisma with id: ${instanceId}`);
        console.log(`arch is ${foundWSInstance?.arch}`);
        podMetadataAnnotations?.set("hookArch", foundWSInstance?.arch === "arm" ? "Hi i am arm" : "Hi i am x86 x2");
    }

    pod?.setMetadata(podMetadata);
    response.setPod(pod);
    console.log(`Pod sent back!`);
    callback(null, response);
};

export { postCreateWorkspacePodModifyHook };
