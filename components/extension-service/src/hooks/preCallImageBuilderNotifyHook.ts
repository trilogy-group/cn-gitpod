/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";

import {
    PreCallImageBuilderNotifyRequest,
    PreCallImageBuilderNotifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

const preCallImageBuilderNotifyHook: grpc.handleUnaryCall<
    PreCallImageBuilderNotifyRequest,
    PreCallImageBuilderNotifyResponse
> = async () => {};

export { preCallImageBuilderNotifyHook };
