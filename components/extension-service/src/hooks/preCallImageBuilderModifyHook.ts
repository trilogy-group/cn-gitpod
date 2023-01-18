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
import { prismaClient } from "../utils/prisma";
import { getPayloadHash } from "../utils/hash";

const preCallImageBuilderModifyHook: grpc.handleUnaryCall<
    PreCallImageBuilderModifyRequest,
    PreCallImageBuilderModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 2 called`);
    console.log("preCallImageBuilderModifyHook", call.request.toObject());

    const request = call.request;
    const response = new PreCallImageBuilderModifyResponse();

    // ! new implementation:
    const payload = request.getPayload();
    const buildRequest = payload?.getBuildrequest()
    // buildRequest?.getSource() -> unique hash
    // ! if input is of form ref -> simply store it
    // buildRequest?.getSource()?.getRef()?.getRef();

    const hash = getPayloadHash(buildRequest);
    console.log(`hookpoint2 - hash: `, hash);

    let message: string;
    // ! prisma stuff
    try {
        // ! we have to update table2 via 1. First we fetch 1
        const wsInstance = await prismaClient.workspaceInstance.findUnique({
            where: {
                instanceId: payload?.getInstance()?.getId(),
            },
        });

        if (!wsInstance) {
            message = `Could not find wsInstance with id: ${payload?.getInstance()?.getId()}`;
        } else {
            // ! check if hash is already present in db
            // If yes, check if the arch matches with the WorkspaceInstance.Config.Arch
            // If not, mark BuildRequest.forceRebuild = True
            // If yes, do nothing.
            // message = `Upserted image with ref: ${hashArch.hash} - arch: ${hashArch.arch}`;

            let hashArch = await prismaClient.hashArch.findUnique({
                where: {
                    hash
                }
            })

            if (!hashArch) {
                // If not mark BuildRequest.forceRebuild = True
                hashArch = await prismaClient.hashArch.create({
                    data: {
                        hash,
                        arch: wsInstance?.arch
                    }
                })
                message = `Created image with hash: ${hashArch.hash} - arch: ${hashArch.arch}`;
            } else {
                if (hashArch?.arch !== wsInstance?.arch) {
                    buildRequest?.setForceRebuild(true)
                    hashArch = await prismaClient.hashArch.update({
                        where: {
                            hash
                        },
                        data: {
                            hash,
                            arch: wsInstance?.arch
                        }
                    })
                    message = `Updated with hash: ${hashArch.hash} - arch: ${hashArch.arch}`;
                } else {
                    message = `Arch is same, no need to update`;
                }
            }
        }
    } catch (err) {
        message = `Error upserting wsInstnace, err: ${err?.message}`;
    }

    console.log(`hookpoint2 - message: `, message);
    console.log(`hookpoint2 - response: `, response.toObject());
    payload?.setBuildrequest(buildRequest)
    response.setPayload(payload);
    callback(null, response);
};

export { preCallImageBuilderModifyHook };
