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

export const ExtensionServiceService: IExtensionServiceService;

export interface IExtensionServiceServer extends grpc.UntypedServiceImplementation {
    preStartWorkspaceNotifyHook: grpc.handleUnaryCall<service_pb.PreStartWorkspaceNotifyRequest, service_pb.PreStartWorkspaceNotifyResponse>;
    postCreateWorkspacePodModifyHook: grpc.handleUnaryCall<service_pb.PostCreateWorkspacePodModifyRequest, service_pb.PostCreateWorkspacePodModifyResponse>;
}

export interface IExtensionServiceClient {
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
}

export class ExtensionServiceClient extends grpc.Client implements IExtensionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public preStartWorkspaceNotifyHook(request: service_pb.PreStartWorkspaceNotifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PreStartWorkspaceNotifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
    public postCreateWorkspacePodModifyHook(request: service_pb.PostCreateWorkspacePodModifyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.PostCreateWorkspacePodModifyResponse) => void): grpc.ClientUnaryCall;
}
