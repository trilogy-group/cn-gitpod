/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceModifyRequest, PreStartWorkspaceModifyResponse } from "@cn-gitpod/extension-service-api/lib";
import { prismaClient } from "../utils/prisma";
import { WorkspaceInstance } from "@prisma/client";
import { Arch, swapTagWithDigest } from "../utils/digest";
import { IMAGE_ARCH_MISMATCH_ERROR } from "../utils/constants";

const preStartWorkspaceModifyHook: grpc.handleUnaryCall<
    PreStartWorkspaceModifyRequest,
    PreStartWorkspaceModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 1 called`);
    console.log("preStartWorkspaceNotifyHookHandler", JSON.stringify(call.request.toObject(), null, 1));

    const request = call.request;
    const response = new PreStartWorkspaceModifyResponse();

    let message = ``;

    const payload = request.getPayload();
    const instanceId = payload?.getInstance()?.getId();
    const arch = payload?.getWorkspace()?.getConfig()?.getArch() as Arch;

    if (payload?.getWorkspace()?.getImagesource()?.hasReference()) {
        console.log(`hookpoint1 - swapping tag with digest`);
        const baseImgResolved = payload?.getWorkspace()?.getImagesource()?.getReference()?.getBaseimageresolved()!;
        console.log(`hookpoint1 - current baseImgResolved: `, baseImgResolved);
        try {
            const newBaseImage = await swapTagWithDigest(baseImgResolved, arch);
            console.log(`hookpoint1 - updated baseImgResolved: `, newBaseImage);
            payload?.getWorkspace()?.getImagesource()?.getReference()?.setBaseimageresolved(newBaseImage);
        } catch (err) {
            if (err?.message === IMAGE_ARCH_MISMATCH_ERROR) {
                message = `Error swapping tag with digest: ${IMAGE_ARCH_MISMATCH_ERROR}`;
                response.setError(err?.message || message);
            }
        }
    }

    // * save in db
    let wsInstance: WorkspaceInstance;
    try {
        wsInstance = await prismaClient.workspaceInstance.create({
            data: {
                instanceId,
                arch,
            },
        });
        message = `Workspace instance id created with id: ${wsInstance.instanceId}`;
    } catch (err) {
        message = `Error creating prisma create for id: ${instanceId}`;
        response.setError(err?.message || message);
    }

    response.setPayload(payload);

    console.log(`hookpoint1 - message: `, message);
    console.log(`hookpoint1 - response: `, JSON.stringify(response.toObject(), null, 1));
    callback(null, response);
};

export { preStartWorkspaceModifyHook };
