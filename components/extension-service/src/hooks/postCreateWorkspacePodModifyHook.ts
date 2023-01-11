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
> = (call, callback) => {};

export { postCreateWorkspacePodModifyHookHandler };
