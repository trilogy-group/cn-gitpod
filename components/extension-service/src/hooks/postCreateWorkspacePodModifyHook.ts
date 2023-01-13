/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import {
    NodeSelectorRequirement,
    NodeSelectorTerm,
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

// ! helper
const NODE_SELECTORS_LIST = {
    arm: [
        {
            key: "gitpod.io/workload_arm_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/workload_arm_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/workload_arm_workspace_regular",
            operator: "Exists",
        },
    ],
    x86: [
        {
            key: "gitpod.io/workload_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/workload_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/workload_workspace_regular",
            operator: "Exists",
        },
    ],
};

//  ! helper function
const getArmNodeSelectorTermsList = (arch: "x86" | "arm") => {
    const nodeSelectorTerms = new NodeSelectorTerm();

    // * all the labels
    const armMatchExpressions: NodeSelectorRequirement[] = [];

    for (let item of NODE_SELECTORS_LIST[arch]) {
        armMatchExpressions.push(new NodeSelectorRequirement().setKey(item.key).setOperator(item.operator));
    }

    nodeSelectorTerms.setMatchexpressionsList(armMatchExpressions);

    return nodeSelectorTerms;
};

const postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 4 called`);
    console.log("postCreateWorkspacePodModifyHook", call.request.toObject());

    const response = new PostCreateWorkspacePodModifyResponse();

    const pod = call.request.getPod();

    // * metadata
    const pMetadata = pod?.getMetadata();
    const podMetadataAnnotations = pMetadata?.getAnnotationsMap();

    // ! pod spec
    const pSpec = pod?.getSpec();
    const pSpecAff = pSpec?.getAffinity();
    const pSpecNodeAff = pSpecAff?.getNodeaffinity();
    const pSpecNodeAffReqExec = pSpecNodeAff?.getRequiredduringschedulingignoredduringexecution();

    let nodeSelectorTerms: NodeSelectorTerm;

    // * check from prisma
    const instanceId = call.request.getWorkspaceinstanceid();
    try {
        const foundWSInstance = await prismaClient?.workspaceInstance.findUnique({
            where: {
                instanceId,
            },
        });
        console.log(`Found WS Instance in prisma with id: ${instanceId}`);
        console.log(`arch is ${foundWSInstance?.arch}`);
        if (foundWSInstance?.arch === "arm") {
            podMetadataAnnotations?.set("hookArch", "Hi i am arm, ws was found in prisma");
            nodeSelectorTerms = getArmNodeSelectorTermsList("arm");
        } else {
            podMetadataAnnotations?.set("hookArch", "Hi i am x86, ws was found in prisma");
            nodeSelectorTerms = getArmNodeSelect
            orTermsList("x86");
        }
    } catch (err) {
        console.log(`WS Instance not found in prisma with id: ${instanceId}`);
        console.log(`Got this error instead: ${err?.message}`);
        podMetadataAnnotations?.set("hookArch", "Hi i am x86, ws was not found in prisma");
        nodeSelectorTerms = getArmNodeSelectorTermsList("x86");
    }

    pSpecNodeAffReqExec?.setNodeselectortermsList([
        ...pSpecNodeAffReqExec.getNodeselectortermsList(),
        nodeSelectorTerms,
    ]);

    pod?.setMetadata(pMetadata);
    response.setPod(pod);
    console.log(`Pod sent back!`);

    callback(null, response);
};

export { postCreateWorkspacePodModifyHook };
