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
import { prismaClient } from "../utils/prisma";

const preCallImageBuilderNotifyHook: grpc.handleUnaryCall<
    PreCallImageBuilderNotifyRequest,
    PreCallImageBuilderNotifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 2 called`);
    console.log("preCallImageBuilderNotifyHook", call.request.toObject());

    const request = call.request;
    const response = new PreCallImageBuilderNotifyResponse();

    const workspaceImageRef = request.getWorkspaceimageref();
    const instanceId = request.getInstance()?.getId();

    let message: string;
    try {
        let wsInstance = await prismaClient.workspaceInstance.upsert({
            where: {
                instanceId,
            },
            create: {
                instanceId,
                workspaceImageRef,
            },
            update: {
                workspaceImageRef,
            },
        });
        message = `Upserted wsInstance with id: ${wsInstance.instanceId}`;
    } catch (err) {
        message = `Error upserting wsInstnace, err: ${err?.message}`;
    }

    console.log({ message });
    response.setMessage(message);

    callback(null, response);
};

export { preCallImageBuilderNotifyHook };
