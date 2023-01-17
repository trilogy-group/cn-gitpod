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

export class PreStartWorkspaceModifyPayload extends jspb.Message {

    hasWorkspace(): boolean;
    clearWorkspace(): void;
    getWorkspace(): Workspace | undefined;
    setWorkspace(value?: Workspace): PreStartWorkspaceModifyPayload;

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): WorkspaceInstance | undefined;
    setInstance(value?: WorkspaceInstance): PreStartWorkspaceModifyPayload;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceModifyPayload.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceModifyPayload): PreStartWorkspaceModifyPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceModifyPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceModifyPayload;
    static deserializeBinaryFromReader(message: PreStartWorkspaceModifyPayload, reader: jspb.BinaryReader): PreStartWorkspaceModifyPayload;
}

export namespace PreStartWorkspaceModifyPayload {
    export type AsObject = {
        workspace?: Workspace.AsObject,
        instance?: WorkspaceInstance.AsObject,
    }
}

export class PreStartWorkspaceModifyRequest extends jspb.Message {

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): PreStartWorkspaceModifyPayload | undefined;
    setPayload(value?: PreStartWorkspaceModifyPayload): PreStartWorkspaceModifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceModifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceModifyRequest): PreStartWorkspaceModifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceModifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceModifyRequest;
    static deserializeBinaryFromReader(message: PreStartWorkspaceModifyRequest, reader: jspb.BinaryReader): PreStartWorkspaceModifyRequest;
}

export namespace PreStartWorkspaceModifyRequest {
    export type AsObject = {
        payload?: PreStartWorkspaceModifyPayload.AsObject,
    }
}

export class PreStartWorkspaceModifyResponse extends jspb.Message {

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): PreStartWorkspaceModifyPayload | undefined;
    setPayload(value?: PreStartWorkspaceModifyPayload): PreStartWorkspaceModifyResponse;
    getError(): string;
    setError(value: string): PreStartWorkspaceModifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreStartWorkspaceModifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PreStartWorkspaceModifyResponse): PreStartWorkspaceModifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreStartWorkspaceModifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreStartWorkspaceModifyResponse;
    static deserializeBinaryFromReader(message: PreStartWorkspaceModifyResponse, reader: jspb.BinaryReader): PreStartWorkspaceModifyResponse;
}

export namespace PreStartWorkspaceModifyResponse {
    export type AsObject = {
        payload?: PreStartWorkspaceModifyPayload.AsObject,
        error: string,
    }
}

export class Workspace extends jspb.Message {

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): WorkspaceConfig | undefined;
    setConfig(value?: WorkspaceConfig): Workspace;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Workspace.AsObject;
    static toObject(includeInstance: boolean, msg: Workspace): Workspace.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Workspace, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Workspace;
    static deserializeBinaryFromReader(message: Workspace, reader: jspb.BinaryReader): Workspace;
}

export namespace Workspace {
    export type AsObject = {
        config?: WorkspaceConfig.AsObject,
    }
}

export class WorkspaceConfig extends jspb.Message {
    getArch(): string;
    setArch(value: string): WorkspaceConfig;

    hasImage(): boolean;
    clearImage(): void;
    getImage(): ImageConfig | undefined;
    setImage(value?: ImageConfig): WorkspaceConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkspaceConfig.AsObject;
    static toObject(includeInstance: boolean, msg: WorkspaceConfig): WorkspaceConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkspaceConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkspaceConfig;
    static deserializeBinaryFromReader(message: WorkspaceConfig, reader: jspb.BinaryReader): WorkspaceConfig;
}

export namespace WorkspaceConfig {
    export type AsObject = {
        arch: string,
        image?: ImageConfig.AsObject,
    }
}

export class ImageConfig extends jspb.Message {

    hasConfigstring(): boolean;
    clearConfigstring(): void;
    getConfigstring(): string;
    setConfigstring(value: string): ImageConfig;

    hasConfigfile(): boolean;
    clearConfigfile(): void;
    getConfigfile(): ImageConfigFile | undefined;
    setConfigfile(value?: ImageConfigFile): ImageConfig;

    getFromCase(): ImageConfig.FromCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageConfig.AsObject;
    static toObject(includeInstance: boolean, msg: ImageConfig): ImageConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageConfig;
    static deserializeBinaryFromReader(message: ImageConfig, reader: jspb.BinaryReader): ImageConfig;
}

export namespace ImageConfig {
    export type AsObject = {
        configstring: string,
        configfile?: ImageConfigFile.AsObject,
    }

    export enum FromCase {
        FROM_NOT_SET = 0,
        CONFIGSTRING = 1,
        CONFIGFILE = 2,
    }

}

export class ImageConfigFile extends jspb.Message {
    getFile(): string;
    setFile(value: string): ImageConfigFile;

    hasContext(): boolean;
    clearContext(): void;
    getContext(): string | undefined;
    setContext(value: string): ImageConfigFile;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageConfigFile.AsObject;
    static toObject(includeInstance: boolean, msg: ImageConfigFile): ImageConfigFile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageConfigFile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageConfigFile;
    static deserializeBinaryFromReader(message: ImageConfigFile, reader: jspb.BinaryReader): ImageConfigFile;
}

export namespace ImageConfigFile {
    export type AsObject = {
        file: string,
        context?: string,
    }
}

export class WorkspaceInstance extends jspb.Message {
    getId(): string;
    setId(value: string): WorkspaceInstance;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkspaceInstance.AsObject;
    static toObject(includeInstance: boolean, msg: WorkspaceInstance): WorkspaceInstance.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkspaceInstance, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkspaceInstance;
    static deserializeBinaryFromReader(message: WorkspaceInstance, reader: jspb.BinaryReader): WorkspaceInstance;
}

export namespace WorkspaceInstance {
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

    hasBuildrequest(): boolean;
    clearBuildrequest(): void;
    getBuildrequest(): BuildRequest | undefined;
    setBuildrequest(value?: BuildRequest): PreStartImageBuildWorkspaceNotifyRequest;
    getBuildid(): string;
    setBuildid(value: string): PreStartImageBuildWorkspaceNotifyRequest;

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
        buildrequest?: BuildRequest.AsObject,
        buildid: string,
    }
}

export class PreStartImageBuildWorkspaceNotifyResponse extends jspb.Message {
    getError(): string;
    setError(value: string): PreStartImageBuildWorkspaceNotifyResponse;

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
        error: string,
    }
}

export class PreCallImageBuilderModifyPayload extends jspb.Message {

    hasBuildrequest(): boolean;
    clearBuildrequest(): void;
    getBuildrequest(): BuildRequest | undefined;
    setBuildrequest(value?: BuildRequest): PreCallImageBuilderModifyPayload;

    hasInstance(): boolean;
    clearInstance(): void;
    getInstance(): WorkspaceInstance | undefined;
    setInstance(value?: WorkspaceInstance): PreCallImageBuilderModifyPayload;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreCallImageBuilderModifyPayload.AsObject;
    static toObject(includeInstance: boolean, msg: PreCallImageBuilderModifyPayload): PreCallImageBuilderModifyPayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreCallImageBuilderModifyPayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreCallImageBuilderModifyPayload;
    static deserializeBinaryFromReader(message: PreCallImageBuilderModifyPayload, reader: jspb.BinaryReader): PreCallImageBuilderModifyPayload;
}

export namespace PreCallImageBuilderModifyPayload {
    export type AsObject = {
        buildrequest?: BuildRequest.AsObject,
        instance?: WorkspaceInstance.AsObject,
    }
}

export class PreCallImageBuilderModifyRequest extends jspb.Message {

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): PreCallImageBuilderModifyPayload | undefined;
    setPayload(value?: PreCallImageBuilderModifyPayload): PreCallImageBuilderModifyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreCallImageBuilderModifyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PreCallImageBuilderModifyRequest): PreCallImageBuilderModifyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreCallImageBuilderModifyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreCallImageBuilderModifyRequest;
    static deserializeBinaryFromReader(message: PreCallImageBuilderModifyRequest, reader: jspb.BinaryReader): PreCallImageBuilderModifyRequest;
}

export namespace PreCallImageBuilderModifyRequest {
    export type AsObject = {
        payload?: PreCallImageBuilderModifyPayload.AsObject,
    }
}

export class PreCallImageBuilderModifyResponse extends jspb.Message {

    hasPayload(): boolean;
    clearPayload(): void;
    getPayload(): PreCallImageBuilderModifyPayload | undefined;
    setPayload(value?: PreCallImageBuilderModifyPayload): PreCallImageBuilderModifyResponse;
    getError(): string;
    setError(value: string): PreCallImageBuilderModifyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreCallImageBuilderModifyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PreCallImageBuilderModifyResponse): PreCallImageBuilderModifyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreCallImageBuilderModifyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreCallImageBuilderModifyResponse;
    static deserializeBinaryFromReader(message: PreCallImageBuilderModifyResponse, reader: jspb.BinaryReader): PreCallImageBuilderModifyResponse;
}

export namespace PreCallImageBuilderModifyResponse {
    export type AsObject = {
        payload?: PreCallImageBuilderModifyPayload.AsObject,
        error: string,
    }
}

export class BuildRequest extends jspb.Message {

    hasSource(): boolean;
    clearSource(): void;
    getSource(): BuildSource | undefined;
    setSource(value?: BuildSource): BuildRequest;

    hasAuth(): boolean;
    clearAuth(): void;
    getAuth(): BuildRegistryAuth | undefined;
    setAuth(value?: BuildRegistryAuth): BuildRequest;
    getForceRebuild(): boolean;
    setForceRebuild(value: boolean): BuildRequest;
    getTriggeredBy(): string;
    setTriggeredBy(value: string): BuildRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BuildRequest): BuildRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildRequest;
    static deserializeBinaryFromReader(message: BuildRequest, reader: jspb.BinaryReader): BuildRequest;
}

export namespace BuildRequest {
    export type AsObject = {
        source?: BuildSource.AsObject,
        auth?: BuildRegistryAuth.AsObject,
        forceRebuild: boolean,
        triggeredBy: string,
    }
}

export class BuildSource extends jspb.Message {

    hasRef(): boolean;
    clearRef(): void;
    getRef(): BuildSourceReference | undefined;
    setRef(value?: BuildSourceReference): BuildSource;

    hasFile(): boolean;
    clearFile(): void;
    getFile(): BuildSourceDockerfile | undefined;
    setFile(value?: BuildSourceDockerfile): BuildSource;

    getFromCase(): BuildSource.FromCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildSource.AsObject;
    static toObject(includeInstance: boolean, msg: BuildSource): BuildSource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildSource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildSource;
    static deserializeBinaryFromReader(message: BuildSource, reader: jspb.BinaryReader): BuildSource;
}

export namespace BuildSource {
    export type AsObject = {
        ref?: BuildSourceReference.AsObject,
        file?: BuildSourceDockerfile.AsObject,
    }

    export enum FromCase {
        FROM_NOT_SET = 0,
        REF = 1,
        FILE = 2,
    }

}

export class BuildRegistryAuth extends jspb.Message {

    hasTotal(): boolean;
    clearTotal(): void;
    getTotal(): BuildRegistryAuthTotal | undefined;
    setTotal(value?: BuildRegistryAuthTotal): BuildRegistryAuth;

    hasSelective(): boolean;
    clearSelective(): void;
    getSelective(): BuildRegistryAuthSelective | undefined;
    setSelective(value?: BuildRegistryAuthSelective): BuildRegistryAuth;

    getAdditionalMap(): jspb.Map<string, string>;
    clearAdditionalMap(): void;

    getModeCase(): BuildRegistryAuth.ModeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildRegistryAuth.AsObject;
    static toObject(includeInstance: boolean, msg: BuildRegistryAuth): BuildRegistryAuth.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildRegistryAuth, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildRegistryAuth;
    static deserializeBinaryFromReader(message: BuildRegistryAuth, reader: jspb.BinaryReader): BuildRegistryAuth;
}

export namespace BuildRegistryAuth {
    export type AsObject = {
        total?: BuildRegistryAuthTotal.AsObject,
        selective?: BuildRegistryAuthSelective.AsObject,

        additionalMap: Array<[string, string]>,
    }

    export enum ModeCase {
        MODE_NOT_SET = 0,
        TOTAL = 1,
        SELECTIVE = 2,
    }

}

export class BuildRegistryAuthTotal extends jspb.Message {
    getAllowAll(): boolean;
    setAllowAll(value: boolean): BuildRegistryAuthTotal;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildRegistryAuthTotal.AsObject;
    static toObject(includeInstance: boolean, msg: BuildRegistryAuthTotal): BuildRegistryAuthTotal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildRegistryAuthTotal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildRegistryAuthTotal;
    static deserializeBinaryFromReader(message: BuildRegistryAuthTotal, reader: jspb.BinaryReader): BuildRegistryAuthTotal;
}

export namespace BuildRegistryAuthTotal {
    export type AsObject = {
        allowAll: boolean,
    }
}

export class BuildRegistryAuthSelective extends jspb.Message {
    getAllowBaserep(): boolean;
    setAllowBaserep(value: boolean): BuildRegistryAuthSelective;
    getAllowWorkspacerep(): boolean;
    setAllowWorkspacerep(value: boolean): BuildRegistryAuthSelective;
    clearAnyOfList(): void;
    getAnyOfList(): Array<string>;
    setAnyOfList(value: Array<string>): BuildRegistryAuthSelective;
    addAnyOf(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildRegistryAuthSelective.AsObject;
    static toObject(includeInstance: boolean, msg: BuildRegistryAuthSelective): BuildRegistryAuthSelective.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildRegistryAuthSelective, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildRegistryAuthSelective;
    static deserializeBinaryFromReader(message: BuildRegistryAuthSelective, reader: jspb.BinaryReader): BuildRegistryAuthSelective;
}

export namespace BuildRegistryAuthSelective {
    export type AsObject = {
        allowBaserep: boolean,
        allowWorkspacerep: boolean,
        anyOfList: Array<string>,
    }
}

export class BuildSourceReference extends jspb.Message {
    getRef(): string;
    setRef(value: string): BuildSourceReference;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildSourceReference.AsObject;
    static toObject(includeInstance: boolean, msg: BuildSourceReference): BuildSourceReference.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildSourceReference, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildSourceReference;
    static deserializeBinaryFromReader(message: BuildSourceReference, reader: jspb.BinaryReader): BuildSourceReference;
}

export namespace BuildSourceReference {
    export type AsObject = {
        ref: string,
    }
}

export class BuildSourceDockerfile extends jspb.Message {

    hasSource(): boolean;
    clearSource(): void;
    getSource(): WorkspaceInitializer | undefined;
    setSource(value?: WorkspaceInitializer): BuildSourceDockerfile;
    getDockerfileVersion(): string;
    setDockerfileVersion(value: string): BuildSourceDockerfile;
    getDockerfilePath(): string;
    setDockerfilePath(value: string): BuildSourceDockerfile;
    getContextPath(): string;
    setContextPath(value: string): BuildSourceDockerfile;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildSourceDockerfile.AsObject;
    static toObject(includeInstance: boolean, msg: BuildSourceDockerfile): BuildSourceDockerfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildSourceDockerfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildSourceDockerfile;
    static deserializeBinaryFromReader(message: BuildSourceDockerfile, reader: jspb.BinaryReader): BuildSourceDockerfile;
}

export namespace BuildSourceDockerfile {
    export type AsObject = {
        source?: WorkspaceInitializer.AsObject,
        dockerfileVersion: string,
        dockerfilePath: string,
        contextPath: string,
    }
}

export class WorkspaceInitializer extends jspb.Message {

    hasGit(): boolean;
    clearGit(): void;
    getGit(): GitInitializer | undefined;
    setGit(value?: GitInitializer): WorkspaceInitializer;

    getSpecCase(): WorkspaceInitializer.SpecCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WorkspaceInitializer.AsObject;
    static toObject(includeInstance: boolean, msg: WorkspaceInitializer): WorkspaceInitializer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WorkspaceInitializer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WorkspaceInitializer;
    static deserializeBinaryFromReader(message: WorkspaceInitializer, reader: jspb.BinaryReader): WorkspaceInitializer;
}

export namespace WorkspaceInitializer {
    export type AsObject = {
        git?: GitInitializer.AsObject,
    }

    export enum SpecCase {
        SPEC_NOT_SET = 0,
        GIT = 2,
    }

}

export class GitInitializer extends jspb.Message {
    getRemoteUri(): string;
    setRemoteUri(value: string): GitInitializer;
    getCloneTarget(): string;
    setCloneTarget(value: string): GitInitializer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GitInitializer.AsObject;
    static toObject(includeInstance: boolean, msg: GitInitializer): GitInitializer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GitInitializer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GitInitializer;
    static deserializeBinaryFromReader(message: GitInitializer, reader: jspb.BinaryReader): GitInitializer;
}

export namespace GitInitializer {
    export type AsObject = {
        remoteUri: string,
        cloneTarget: string,
    }
}
