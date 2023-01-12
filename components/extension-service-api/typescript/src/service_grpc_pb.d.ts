/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// package: extension_service
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as service_pb from "./service_pb";

interface IExtensionServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    preStartWorkspaceNotifyHook: IExtensionServiceService_IpreStartWorkspaceNotifyHook;
    postCreateWorkspacePodModifyHook: IExtensionServiceService_IPostCreateWorkspacePodModifyHook;
    preStartImageBuildWorkspaceNotifyHook: IExtensionServiceService_IPreStartImageBuildWorkspaceNotifyHook;
    preCallImageBuilderNotifyHook: IExtensionServiceService_IPreCallImageBuilderNotifyHook;
}

interface IExtensionServiceService_IpreStartWorkspaceNotifyHook extends grpc.MethodDefinition<service_pb.PreStartWorkspaceNotifyRequest, service_pb.PreStartWorkspaceNotifyResponse> {
    path: "/extension_service.ExtensionService/preStartWorkspaceNotifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreStartWorkspaceNotifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreStartWorkspaceNotifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreStartWorkspaceNotifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreStartWorkspaceNotifyResponse>;
}
interface IExtensionServiceService_IPostCreateWorkspacePodModifyHook extends grpc.MethodDefinition<service_pb.PostCreateWorkspacePodModifyRequest, service_pb.PostCreateWorkspacePodModifyResponse> {
    path: "/extension_service.ExtensionService/PostCreateWorkspacePodModifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PostCreateWorkspacePodModifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PostCreateWorkspacePodModifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PostCreateWorkspacePodModifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PostCreateWorkspacePodModifyResponse>;
}
interface IExtensionServiceService_IPreStartImageBuildWorkspaceNotifyHook extends grpc.MethodDefinition<service_pb.PreStartImageBuildWorkspaceNotifyRequest, service_pb.PreStartImageBuildWorkspaceNotifyResponse> {
    path: "/extension_service.ExtensionService/PreStartImageBuildWorkspaceNotifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreStartImageBuildWorkspaceNotifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreStartImageBuildWorkspaceNotifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
}
interface IExtensionServiceService_IPreCallImageBuilderNotifyHook extends grpc.MethodDefinition<service_pb.PreCallImageBuilderNotifyRequest, service_pb.PreCallImageBuilderNotifyResponse> {
    path: "/extension_service.ExtensionService/PreCallImageBuilderNotifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreCallImageBuilderNotifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreCallImageBuilderNotifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreCallImageBuilderNotifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreCallImageBuilderNotifyResponse>;
}

export const ExtensionServiceService: IExtensionServiceService;

export interface IExtensionServiceServer extends grpc.UntypedServiceImplementation {
    preStartWorkspaceNotifyHook: grpc.handleUnaryCall<service_pb.PreStartWorkspaceNotifyRequest, service_pb.PreStartWorkspaceNotifyResponse>;
    postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<service_pb.PostCreateWorkspacePodModifyRequest, service_pb.PostCreateWorkspacePodModifyResponse>;
    preStartImageBuildWorkspaceNotifyHook: grpc.handleUnaryCall<service_pb.PreStartImageBuildWorkspaceNotifyRequest, service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
    preCallImageBuilderNotifyHook: grpc.handleUnaryCall<service_pb.PreCallImageBuilderNotifyRequest, service_pb.PreCallImageBuilderNotifyResponse>;
}

export interface IExtensionServiceClient {
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
}

export class ExtensionServiceClient extends grpc.Client implements IExtensionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderNotifyHook(request: service_pb.PreCallImageBuilderNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderNotifyResponse) => void): grpc.ClientUnaryCall;
}
