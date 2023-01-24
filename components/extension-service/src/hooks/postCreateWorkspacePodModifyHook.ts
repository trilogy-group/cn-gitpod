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
import { Arch } from "../utils/digest";

// ! helper
const NODE_SELECTORS_LIST = {
    arm: [
        {
            key: "gitpod.io/workload_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/ws-daemon_ready_ns_gitpod-infra-test",
            operator: "Exists",
        },
        {
            key: "gitpod.io/registry-facade_ready_ns_gitpod-infra-test",
            operator: "Exists",
        },
        {
            key: "kubernetes.io/arch",
            operator: "In",
            values: ["arm64"],
        },
    ],
    x86: [
        {
            key: "gitpod.io/workload_workspace_regular",
            operator: "Exists",
        },
        {
            key: "gitpod.io/ws-daemon_ready_ns_gitpod-infra-test",
            operator: "Exists",
        },
        {
            key: "gitpod.io/registry-facade_ready_ns_gitpod-infra-test",
            operator: "Exists",
        },
        {
            key: "kubernetes.io/arch",
            operator: "In",
            values: ["amd64"],
        },
    ],
};

//  ! helper function
const constructNodeAffinity = (arch: Arch, nodeSelectorTerm: NodeSelectorTerm | undefined) => {
    const matchExpressions = nodeSelectorTerm?.getMatchexpressionsList();

    // ! when we already have existing selector terms
    if (matchExpressions?.length) {
        const newMatchExpressionList = matchExpressions.map((item) => {
            const requirement = new NodeSelectorRequirement();
            requirement.setKey(item?.getKey()!);
            requirement.setOperator(item?.getOperator()!);
            if (item.getValuesList()?.length) {
                requirement?.setValuesList(item.getValuesList());
            }

            return requirement;
        });

        // ! we want to add the arch expression as well
        const archReq = new NodeSelectorRequirement();
        archReq.setKey("kubernetes.io/arch");
        archReq.setOperator("In");
        archReq.setValuesList([arch === "arm" ? "arm64" : "amd64"]);
        newMatchExpressionList.push(archReq);

        return newMatchExpressionList;
    }

    // ! default case
    const affinityItems = NODE_SELECTORS_LIST[arch];
    const newMatchExpressionList = affinityItems.map((item) => {
        const requirement = new NodeSelectorRequirement();
        requirement.setKey(item.key);
        requirement.setOperator(item.operator);
        if (item.values?.length) {
            requirement?.setValuesList(item.values);
        }

        return requirement;
    });
    return newMatchExpressionList;
};

// const getCurrentMatchExpression = () => {

// }

const postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse
> = async (call, callback) => {
    console.log(`extension-service serve hookpoint 4 called`);
    // console.log("postCreateWorkspacePodModifyHook", JSON.stringify(call.request.toObject(), null, 1));

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
    const pSpecNodeAffReqExecMatchExp = pSpecNodeAffReqExec?.getNodeselectortermsList()[0];
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
            // nodeSelectorTerms = getArmNodeSelectorTermsList("arm");

            const matchExpressions = constructNodeAffinity("arm", pSpecNodeAffReqExecMatchExp);
            pSpecNodeAffReqExec?.getNodeselectortermsList()[0]?.setMatchexpressionsList(matchExpressions);
        } else {
            podMetadataAnnotations?.set("hookArch", "Hi i am x86, ws was found in prisma");
            const matchExpressions = constructNodeAffinity("x86", pSpecNodeAffReqExecMatchExp);
            pSpecNodeAffReqExec?.getNodeselectortermsList()[0]?.setMatchexpressionsList(matchExpressions);
        }
    } catch (err) {
        console.log(`ERROR: WS Instance not found in prisma with id: ${instanceId}`);
        console.log(`Got this error instead: ${err?.message}`);
        podMetadataAnnotations?.set("hookArch", "Hi i am x86, ws was not found in prisma");
        const matchExpressions = constructNodeAffinity("x86", pSpecNodeAffReqExecMatchExp);
        pSpecNodeAffReqExec?.getNodeselectortermsList()[0]?.setMatchexpressionsList(matchExpressions);
    }

    pSpecNodeAff?.setRequiredduringschedulingignoredduringexecution(pSpecNodeAffReqExec);
    pSpecAff?.setNodeaffinity(pSpecNodeAff);
    pSpec?.setAffinity(pSpecAff);

    pod?.setSpec(pSpec);
    pod?.setMetadata(pMetadata);

    response.setPod(pod);
    // console.log(`Pod sent back!`, JSON.stringify(response.toObject(), null, 1));
    console.log(`Pod sent back!`);

    callback(null, response);
};

export { postCreateWorkspacePodModifyHook };
