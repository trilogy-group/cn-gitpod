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

const postCreateWorkspacePodModifyHookHandler: grpc.handleUnaryCall<
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse
> = (call, callback) => {
    console.log(`extension-service server: postCreateWorkspacePodModifyHookHandler`);
    console.log("postCreateWorkspacePodModifyHookHandler", call.request.toObject());

    const request = call.request.toObject();
    console.log(JSON.stringify(request));
    const response = new PostCreateWorkspacePodModifyResponse();

    console.log(`point 1`);
    const pod = call.request.getPod();
    console.log(`casting`);
    response.setPod(pod);
    console.log(`point 2`);
    callback(null, response);
};

export { postCreateWorkspacePodModifyHookHandler };
