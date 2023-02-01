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
    preStartWorkspaceModifyHook: IExtensionServiceService_IpreStartWorkspaceModifyHook;
    postCreateWorkspacePodModifyHook: IExtensionServiceService_IPostCreateWorkspacePodModifyHook;
    preStartImageBuildWorkspaceNotifyHook: IExtensionServiceService_IpreStartImageBuildWorkspaceNotifyHook;
    preCallImageBuilderModifyHook: IExtensionServiceService_IpreCallImageBuilderModifyHook;
}

interface IExtensionServiceService_IpreStartWorkspaceModifyHook extends grpc.MethodDefinition<service_pb.PreStartWorkspaceModifyRequest, service_pb.PreStartWorkspaceModifyResponse> {
    path: "/extension_service.ExtensionService/preStartWorkspaceModifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreStartWorkspaceModifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreStartWorkspaceModifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreStartWorkspaceModifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreStartWorkspaceModifyResponse>;
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
interface IExtensionServiceService_IpreStartImageBuildWorkspaceNotifyHook extends grpc.MethodDefinition<service_pb.PreStartImageBuildWorkspaceNotifyRequest, service_pb.PreStartImageBuildWorkspaceNotifyResponse> {
    path: "/extension_service.ExtensionService/preStartImageBuildWorkspaceNotifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreStartImageBuildWorkspaceNotifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreStartImageBuildWorkspaceNotifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
}
interface IExtensionServiceService_IpreCallImageBuilderModifyHook extends grpc.MethodDefinition<service_pb.PreCallImageBuilderModifyRequest, service_pb.PreCallImageBuilderModifyResponse> {
    path: "/extension_service.ExtensionService/preCallImageBuilderModifyHook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.PreCallImageBuilderModifyRequest>;
    requestDeserialize: grpc.deserialize<service_pb.PreCallImageBuilderModifyRequest>;
    responseSerialize: grpc.serialize<service_pb.PreCallImageBuilderModifyResponse>;
    responseDeserialize: grpc.deserialize<service_pb.PreCallImageBuilderModifyResponse>;
}

export const ExtensionServiceService: IExtensionServiceService;

export interface IExtensionServiceServer extends grpc.UntypedServiceImplementation {
    preStartWorkspaceModifyHook: grpc.handleUnaryCall<service_pb.PreStartWorkspaceModifyRequest, service_pb.PreStartWorkspaceModifyResponse>;
    postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<service_pb.PostCreateWorkspacePodModifyRequest, service_pb.PostCreateWorkspacePodModifyResponse>;
    preStartImageBuildWorkspaceNotifyHook: grpc.handleUnaryCall<service_pb.PreStartImageBuildWorkspaceNotifyRequest, service_pb.PreStartImageBuildWorkspaceNotifyResponse>;
    preCallImageBuilderModifyHook: grpc.handleUnaryCall<service_pb.PreCallImageBuilderModifyRequest, service_pb.PreCallImageBuilderModifyResponse>;
}

export interface IExtensionServiceClient {
    preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
    preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
}

export class ExtensionServiceClient extends grpc.Client implements IExtensionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceModifyHook(request: service_pb.PreStartWorkspaceModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartImageBuildWorkspaceNotifyHook(request: service_pb.PreStartImageBuildWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartImageBuildWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
    public preCallImageBuilderModifyHook(request: service_pb.PreCallImageBuilderModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreCallImageBuilderModifyResponse) => void): grpc.ClientUnaryCall;
}
