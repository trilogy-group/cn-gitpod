/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service_pb = require('./service_pb.js');

function serialize_extension_service_PostCreateWorkspacePodModifyRequest(arg) {
  if (!(arg instanceof service_pb.PostCreateWorkspacePodModifyRequest)) {
    throw new Error('Expected argument of type extension_service.PostCreateWorkspacePodModifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PostCreateWorkspacePodModifyRequest(buffer_arg) {
  return service_pb.PostCreateWorkspacePodModifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PostCreateWorkspacePodModifyResponse(arg) {
  if (!(arg instanceof service_pb.PostCreateWorkspacePodModifyResponse)) {
    throw new Error('Expected argument of type extension_service.PostCreateWorkspacePodModifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PostCreateWorkspacePodModifyResponse(buffer_arg) {
  return service_pb.PostCreateWorkspacePodModifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreCallImageBuilderNotifyRequest(arg) {
  if (!(arg instanceof service_pb.PreCallImageBuilderNotifyRequest)) {
    throw new Error('Expected argument of type extension_service.PreCallImageBuilderNotifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreCallImageBuilderNotifyRequest(buffer_arg) {
  return service_pb.PreCallImageBuilderNotifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreCallImageBuilderNotifyResponse(arg) {
  if (!(arg instanceof service_pb.PreCallImageBuilderNotifyResponse)) {
    throw new Error('Expected argument of type extension_service.PreCallImageBuilderNotifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreCallImageBuilderNotifyResponse(buffer_arg) {
  return service_pb.PreCallImageBuilderNotifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreStartImageBuildWorkspaceNotifyRequest(arg) {
  if (!(arg instanceof service_pb.PreStartImageBuildWorkspaceNotifyRequest)) {
    throw new Error('Expected argument of type extension_service.PreStartImageBuildWorkspaceNotifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartImageBuildWorkspaceNotifyRequest(buffer_arg) {
  return service_pb.PreStartImageBuildWorkspaceNotifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreStartImageBuildWorkspaceNotifyResponse(arg) {
  if (!(arg instanceof service_pb.PreStartImageBuildWorkspaceNotifyResponse)) {
    throw new Error('Expected argument of type extension_service.PreStartImageBuildWorkspaceNotifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartImageBuildWorkspaceNotifyResponse(buffer_arg) {
  return service_pb.PreStartImageBuildWorkspaceNotifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreStartWorkspaceNotifyRequest(arg) {
  if (!(arg instanceof service_pb.PreStartWorkspaceNotifyRequest)) {
    throw new Error('Expected argument of type extension_service.PreStartWorkspaceNotifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartWorkspaceNotifyRequest(buffer_arg) {
  return service_pb.PreStartWorkspaceNotifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreStartWorkspaceNotifyResponse(arg) {
  if (!(arg instanceof service_pb.PreStartWorkspaceNotifyResponse)) {
    throw new Error('Expected argument of type extension_service.PreStartWorkspaceNotifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartWorkspaceNotifyResponse(buffer_arg) {
  return service_pb.PreStartWorkspaceNotifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExtensionServiceService = exports.ExtensionServiceService = {
  // Hook point 1
preStartWorkspaceNotifyHook: {
    path: '/extension_service.ExtensionService/preStartWorkspaceNotifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PreStartWorkspaceNotifyRequest,
    responseType: service_pb.PreStartWorkspaceNotifyResponse,
    requestSerialize: serialize_extension_service_PreStartWorkspaceNotifyRequest,
    requestDeserialize: deserialize_extension_service_PreStartWorkspaceNotifyRequest,
    responseSerialize: serialize_extension_service_PreStartWorkspaceNotifyResponse,
    responseDeserialize: deserialize_extension_service_PreStartWorkspaceNotifyResponse,
  },
  // Hook point 4
postCreateWorkspacePodModifyHook: {
    path: '/extension_service.ExtensionService/PostCreateWorkspacePodModifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PostCreateWorkspacePodModifyRequest,
    responseType: service_pb.PostCreateWorkspacePodModifyResponse,
    requestSerialize: serialize_extension_service_PostCreateWorkspacePodModifyRequest,
    requestDeserialize: deserialize_extension_service_PostCreateWorkspacePodModifyRequest,
    responseSerialize: serialize_extension_service_PostCreateWorkspacePodModifyResponse,
    responseDeserialize: deserialize_extension_service_PostCreateWorkspacePodModifyResponse,
  },
  // Hook point 3
preStartImageBuildWorkspaceNotifyHook: {
    path: '/extension_service.ExtensionService/PreStartImageBuildWorkspaceNotifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PreStartImageBuildWorkspaceNotifyRequest,
    responseType: service_pb.PreStartImageBuildWorkspaceNotifyResponse,
    requestSerialize: serialize_extension_service_PreStartImageBuildWorkspaceNotifyRequest,
    requestDeserialize: deserialize_extension_service_PreStartImageBuildWorkspaceNotifyRequest,
    responseSerialize: serialize_extension_service_PreStartImageBuildWorkspaceNotifyResponse,
    responseDeserialize: deserialize_extension_service_PreStartImageBuildWorkspaceNotifyResponse,
  },
  // Hook point 2
preCallImageBuilderNotifyHook: {
    path: '/extension_service.ExtensionService/PreCallImageBuilderNotifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PreCallImageBuilderNotifyRequest,
    responseType: service_pb.PreCallImageBuilderNotifyResponse,
    requestSerialize: serialize_extension_service_PreCallImageBuilderNotifyRequest,
    requestDeserialize: deserialize_extension_service_PreCallImageBuilderNotifyRequest,
    responseSerialize: serialize_extension_service_PreCallImageBuilderNotifyResponse,
    responseDeserialize: deserialize_extension_service_PreCallImageBuilderNotifyResponse,
  },
};

exports.ExtensionServiceClient = grpc.makeGenericClientConstructor(ExtensionServiceService);
