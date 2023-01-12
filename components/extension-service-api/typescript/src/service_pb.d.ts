/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// package: extension_service
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PreStartWorkspaceNotifyRequest extends jspb.Message {

    hasWorkspace(): boolean;
    clearWorkspace(): void;
    getWorkspace(): PreStartWorkspace | undefined;
    setWorkspace(value?: PreStartWorkspace): PreStartWorkspaceNotifyRequest;

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): PreStartWorkspaceInstance | undefined;
    setInstance(value?: PreStartWorkspaceInstance): PreStartWorkspaceNotifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceNotifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceNotifyRequest): PreStartWorkspaceNotifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceNotifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceNotifyRequest;
    static deserializeBinaryFromReader(message: PreStartWorkspaceNotifyRequest, reader: jspb.BinaryReader): PreStartWorkspaceNotifyRequest;
}

export namespace PreStartWorkspaceNotifyRequest {
    export type AsObject = {
        workspace?: PreStartWorkspace.AsObject,
        instance?: PreStartWorkspaceInstance.AsObject,
    }
}

export class PreStartWorkspaceNotifyResponse extends jspb.Message {
    getMessage(): string;
    setMessage(value: string): PreStartWorkspaceNotifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceNotifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceNotifyResponse): PreStartWorkspaceNotifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceNotifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceNotifyResponse;
    static deserializeBinaryFromReader(message: PreStartWorkspaceNotifyResponse, reader: jspb.BinaryReader): PreStartWorkspaceNotifyResponse;
}

export namespace PreStartWorkspaceNotifyResponse {
    export type AsObject = {
        message: string,
    }
}

export class PreStartWorkspace extends jspb.Message {

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): PreStartWorkspaceConfig | undefined;
    setConfig(value?: PreStartWorkspaceConfig): PreStartWorkspace;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspace.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspace): PreStartWorkspace.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspace, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspace;
    static deserializeBinaryFromReader(message: PreStartWorkspace, reader: jspb.BinaryReader): PreStartWorkspace;
}

export namespace PreStartWorkspace {
    export type AsObject = {
        config?: PreStartWorkspaceConfig.AsObject,
    }
}

export class PreStartWorkspaceConfig extends jspb.Message {
    getArch(): string;
    setArch(value: string): PreStartWorkspaceConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceConfig.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceConfig): PreStartWorkspaceConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceConfig;
    static deserializeBinaryFromReader(message: PreStartWorkspaceConfig, reader: jspb.BinaryReader): PreStartWorkspaceConfig;
}

export namespace PreStartWorkspaceConfig {
    export type AsObject = {
        arch: string,
    }
}

export class PreStartWorkspaceInstance extends jspb.Message {
    getId(): string;
    setId(value: string): PreStartWorkspaceInstance;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceInstance.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceInstance): PreStartWorkspaceInstance.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceInstance, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceInstance;
    static deserializeBinaryFromReader(message: PreStartWorkspaceInstance, reader: jspb.BinaryReader): PreStartWorkspaceInstance;
}

export namespace PreStartWorkspaceInstance {
    export type AsObject = {
        id: string,
    }
}

export class PostCreateWorkspacePodModifyRequest extends jspb.Message {
    getWorkspaceinstanceid(): string;
    setWorkspaceinstanceid(value: string): PostCreateWorkspacePodModifyRequest;

    hasPod(): boolean;
    clearPod(): void;
    getPod(): Pod | undefined;
    setPod(value?: Pod): PostCreateWorkspacePodModifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PostCreateWorkspacePodModifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PostCreateWorkspacePodModifyRequest): PostCreateWorkspacePodModifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PostCreateWorkspacePodModifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PostCreateWorkspacePodModifyRequest;
    static deserializeBinaryFromReader(message: PostCreateWorkspacePodModifyRequest, reader: jspb.BinaryReader): PostCreateWorkspacePodModifyRequest;
}

export namespace PostCreateWorkspacePodModifyRequest {
    export type AsObject = {
        workspaceinstanceid: string,
        pod?: Pod.AsObject,
    }
}

export class PostCreateWorkspacePodModifyResponse extends jspb.Message {

    hasPod(): boolean;
    clearPod(): void;
    getPod(): Pod | undefined;
    setPod(value?: Pod): PostCreateWorkspacePodModifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PostCreateWorkspacePodModifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PostCreateWorkspacePodModifyResponse): PostCreateWorkspacePodModifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PostCreateWorkspacePodModifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PostCreateWorkspacePodModifyResponse;
    static deserializeBinaryFromReader(message: PostCreateWorkspacePodModifyResponse, reader: jspb.BinaryReader): PostCreateWorkspacePodModifyResponse;
}

export namespace PostCreateWorkspacePodModifyResponse {
    export type AsObject = {
        pod?: Pod.AsObject,
    }
}

export class Pod extends jspb.Message {

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): ObjectMeta | undefined;
    setMetadata(value?: ObjectMeta): Pod;

    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): PodSpec | undefined;
    setSpec(value?: PodSpec): Pod;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Pod.AsObject;
    static toObject(includeInstance: boolean, msg: Pod): Pod.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Pod, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Pod;
    static deserializeBinaryFromReader(message: Pod, reader: jspb.BinaryReader): Pod;
}

export namespace Pod {
    export type AsObject = {
        metadata?: ObjectMeta.AsObject,
        spec?: PodSpec.AsObject,
    }
}

export class ObjectMeta extends jspb.Message {

    getAnnotationsMap(): jspb.Map<string, string>;
    clearAnnotationsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ObjectMeta.AsObject;
    static toObject(includeInstance: boolean, msg: ObjectMeta): ObjectMeta.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ObjectMeta, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ObjectMeta;
    static deserializeBinaryFromReader(message: ObjectMeta, reader: jspb.BinaryReader): ObjectMeta;
}

export namespace ObjectMeta {
    export type AsObject = {

        annotationsMap: Array<[string, string]>,
    }
}

export class PodSpec extends jspb.Message {

    hasAffinity(): boolean;
    clearAffinity(): void;
    getAffinity(): Affinity | undefined;
    setAffinity(value?: Affinity): PodSpec;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PodSpec.AsObject;
    static toObject(includeInstance: boolean, msg: PodSpec): PodSpec.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PodSpec, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PodSpec;
    static deserializeBinaryFromReader(message: PodSpec, reader: jspb.BinaryReader): PodSpec;
}

export namespace PodSpec {
    export type AsObject = {
        affinity?: Affinity.AsObject,
    }
}

export class Affinity extends jspb.Message {

    hasNodeaffinity(): boolean;
    clearNodeaffinity(): void;
    getNodeaffinity(): NodeAffinity | undefined;
    setNodeaffinity(value?: NodeAffinity): Affinity;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Affinity.AsObject;
    static toObject(includeInstance: boolean, msg: Affinity): Affinity.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Affinity, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Affinity;
    static deserializeBinaryFromReader(message: Affinity, reader: jspb.BinaryReader): Affinity;
}

export namespace Affinity {
    export type AsObject = {
        nodeaffinity?: NodeAffinity.AsObject,
    }
}

export class NodeAffinity extends jspb.Message {

    hasRequiredduringschedulingignoredduringexecution(): boolean;
    clearRequiredduringschedulingignoredduringexecution(): void;
    getRequiredduringschedulingignoredduringexecution(): NodeSelector | undefined;
    setRequiredduringschedulingignoredduringexecution(value?: NodeSelector): NodeAffinity;
    clearPreferredduringschedulingignoredduringexecutionList(): void;
    getPreferredduringschedulingignoredduringexecutionList(): Array<PreferredSchedulingTerm>;
    setPreferredduringschedulingignoredduringexecutionList(value: Array<PreferredSchedulingTerm>): NodeAffinity;
    addPreferredduringschedulingignoredduringexecution(value?: PreferredSchedulingTerm, index?: number): PreferredSchedulingTerm;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeAffinity.AsObject;
    static toObject(includeInstance: boolean, msg: NodeAffinity): NodeAffinity.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeAffinity, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeAffinity;
    static deserializeBinaryFromReader(message: NodeAffinity, reader: jspb.BinaryReader): NodeAffinity;
}

export namespace NodeAffinity {
    export type AsObject = {
        requiredduringschedulingignoredduringexecution?: NodeSelector.AsObject,
        preferredduringschedulingignoredduringexecutionList: Array<PreferredSchedulingTerm.AsObject>,
    }
}

export class NodeSelector extends jspb.Message {
    clearNodeselectortermsList(): void;
    getNodeselectortermsList(): Array<NodeSelectorTerm>;
    setNodeselectortermsList(value: Array<NodeSelectorTerm>): NodeSelector;
    addNodeselectorterms(value?: NodeSelectorTerm, index?: number): NodeSelectorTerm;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeSelector.AsObject;
    static toObject(includeInstance: boolean, msg: NodeSelector): NodeSelector.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeSelector, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeSelector;
    static deserializeBinaryFromReader(message: NodeSelector, reader: jspb.BinaryReader): NodeSelector;
}

export namespace NodeSelector {
    export type AsObject = {
        nodeselectortermsList: Array<NodeSelectorTerm.AsObject>,
    }
}

export class NodeSelectorTerm extends jspb.Message {
    clearMatchexpressionsList(): void;
    getMatchexpressionsList(): Array<NodeSelectorRequirement>;
    setMatchexpressionsList(value: Array<NodeSelectorRequirement>): NodeSelectorTerm;
    addMatchexpressions(value?: NodeSelectorRequirement, index?: number): NodeSelectorRequirement;
    clearMatchfieldsList(): void;
    getMatchfieldsList(): Array<NodeSelectorRequirement>;
    setMatchfieldsList(value: Array<NodeSelectorRequirement>): NodeSelectorTerm;
    addMatchfields(value?: NodeSelectorRequirement, index?: number): NodeSelectorRequirement;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeSelectorTerm.AsObject;
    static toObject(includeInstance: boolean, msg: NodeSelectorTerm): NodeSelectorTerm.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeSelectorTerm, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeSelectorTerm;
    static deserializeBinaryFromReader(message: NodeSelectorTerm, reader: jspb.BinaryReader): NodeSelectorTerm;
}

export namespace NodeSelectorTerm {
    export type AsObject = {
        matchexpressionsList: Array<NodeSelectorRequirement.AsObject>,
        matchfieldsList: Array<NodeSelectorRequirement.AsObject>,
    }
}

export class NodeSelectorRequirement extends jspb.Message {

    hasKey(): boolean;
    clearKey(): void;
    getKey(): string | undefined;
    setKey(value: string): NodeSelectorRequirement;

    hasOperator(): boolean;
    clearOperator(): void;
    getOperator(): string | undefined;
    setOperator(value: string): NodeSelectorRequirement;
    clearValuesList(): void;
    getValuesList(): Array<string>;
    setValuesList(value: Array<string>): NodeSelectorRequirement;
    addValues(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeSelectorRequirement.AsObject;
    static toObject(includeInstance: boolean, msg: NodeSelectorRequirement): NodeSelectorRequirement.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeSelectorRequirement, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeSelectorRequirement;
    static deserializeBinaryFromReader(message: NodeSelectorRequirement, reader: jspb.BinaryReader): NodeSelectorRequirement;
}

export namespace NodeSelectorRequirement {
    export type AsObject = {
        key?: string,
        operator?: string,
        valuesList: Array<string>,
    }
}

export class PreferredSchedulingTerm extends jspb.Message {

    hasWeight(): boolean;
    clearWeight(): void;
    getWeight(): number | undefined;
    setWeight(value: number): PreferredSchedulingTerm;

    hasPreference(): boolean;
    clearPreference(): void;
    getPreference(): NodeSelectorTerm | undefined;
    setPreference(value?: NodeSelectorTerm): PreferredSchedulingTerm;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreferredSchedulingTerm.AsObject;
    static toObject(includeInstance: boolean, msg: PreferredSchedulingTerm): PreferredSchedulingTerm.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreferredSchedulingTerm, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreferredSchedulingTerm;
    static deserializeBinaryFromReader(message: PreferredSchedulingTerm, reader: jspb.BinaryReader): PreferredSchedulingTerm;
}

export namespace PreferredSchedulingTerm {
    export type AsObject = {
        weight?: number,
        preference?: NodeSelectorTerm.AsObject,
    }
}

export class PreStartImageBuildWorkspaceNotifyRequest extends jspb.Message {
    getWorkspaceimageref(): string;
    setWorkspaceimageref(value: string): PreStartImageBuildWorkspaceNotifyRequest;

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): PreStartWorkspaceInstance | undefined;
    setInstance(value?: PreStartWorkspaceInstance): PreStartImageBuildWorkspaceNotifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartImageBuildWorkspaceNotifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartImageBuildWorkspaceNotifyRequest): PreStartImageBuildWorkspaceNotifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartImageBuildWorkspaceNotifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartImageBuildWorkspaceNotifyRequest;
    static deserializeBinaryFromReader(message: PreStartImageBuildWorkspaceNotifyRequest, reader: jspb.BinaryReader): PreStartImageBuildWorkspaceNotifyRequest;
}

export namespace PreStartImageBuildWorkspaceNotifyRequest {
    export type AsObject = {
        workspaceimageref: string,
        instance?: PreStartWorkspaceInstance.AsObject,
    }
}

export class PreStartImageBuildWorkspaceNotifyResponse extends jspb.Message {
    getMessage(): string;
    setMessage(value: string): PreStartImageBuildWorkspaceNotifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartImageBuildWorkspaceNotifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartImageBuildWorkspaceNotifyResponse): PreStartImageBuildWorkspaceNotifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartImageBuildWorkspaceNotifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartImageBuildWorkspaceNotifyResponse;
    static deserializeBinaryFromReader(message: PreStartImageBuildWorkspaceNotifyResponse, reader: jspb.BinaryReader): PreStartImageBuildWorkspaceNotifyResponse;
}

export namespace PreStartImageBuildWorkspaceNotifyResponse {
    export type AsObject = {
        message: string,
    }
}

export class PreImageBuildRequestNotifyRequest extends jspb.Message {
    getWorkspaceimageref(): string;
    setWorkspaceimageref(value: string): PreImageBuildRequestNotifyRequest;
    getBuildid(): string;
    setBuildid(value: string): PreImageBuildRequestNotifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreImageBuildRequestNotifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PreImageBuildRequestNotifyRequest): PreImageBuildRequestNotifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreImageBuildRequestNotifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreImageBuildRequestNotifyRequest;
    static deserializeBinaryFromReader(message: PreImageBuildRequestNotifyRequest, reader: jspb.BinaryReader): PreImageBuildRequestNotifyRequest;
}

export namespace PreImageBuildRequestNotifyRequest {
    export type AsObject = {
        workspaceimageref: string,
        buildid: string,
    }
}

export class PreImageBuildRequestNotifyResponse extends jspb.Message {
    getMessage(): string;
    setMessage(value: string): PreImageBuildRequestNotifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreImageBuildRequestNotifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PreImageBuildRequestNotifyResponse): PreImageBuildRequestNotifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreImageBuildRequestNotifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreImageBuildRequestNotifyResponse;
    static deserializeBinaryFromReader(message: PreImageBuildRequestNotifyResponse, reader: jspb.BinaryReader): PreImageBuildRequestNotifyResponse;
}

export namespace PreImageBuildRequestNotifyResponse {
    export type AsObject = {
        message: string,
    }
}
