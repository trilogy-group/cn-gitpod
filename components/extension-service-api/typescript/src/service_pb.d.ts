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
