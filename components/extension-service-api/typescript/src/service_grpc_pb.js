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

function serialize_extension_service_PreCallImageBuilderModifyRequest(arg) {
  if (!(arg instanceof service_pb.PreCallImageBuilderModifyRequest)) {
    throw new Error('Expected argument of type extension_service.PreCallImageBuilderModifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreCallImageBuilderModifyRequest(buffer_arg) {
  return service_pb.PreCallImageBuilderModifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreCallImageBuilderModifyResponse(arg) {
  if (!(arg instanceof service_pb.PreCallImageBuilderModifyResponse)) {
    throw new Error('Expected argument of type extension_service.PreCallImageBuilderModifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreCallImageBuilderModifyResponse(buffer_arg) {
  return service_pb.PreCallImageBuilderModifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_extension_service_PreStartWorkspaceModifyRequest(arg) {
  if (!(arg instanceof service_pb.PreStartWorkspaceModifyRequest)) {
    throw new Error('Expected argument of type extension_service.PreStartWorkspaceModifyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartWorkspaceModifyRequest(buffer_arg) {
  return service_pb.PreStartWorkspaceModifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_extension_service_PreStartWorkspaceModifyResponse(arg) {
  if (!(arg instanceof service_pb.PreStartWorkspaceModifyResponse)) {
    throw new Error('Expected argument of type extension_service.PreStartWorkspaceModifyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_extension_service_PreStartWorkspaceModifyResponse(buffer_arg) {
  return service_pb.PreStartWorkspaceModifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExtensionServiceService = exports.ExtensionServiceService = {
  // Hook point 1
preStartWorkspaceModifyHook: {
    path: '/extension_service.ExtensionService/preStartWorkspaceModifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PreStartWorkspaceModifyRequest,
    responseType: service_pb.PreStartWorkspaceModifyResponse,
    requestSerialize: serialize_extension_service_PreStartWorkspaceModifyRequest,
    requestDeserialize: deserialize_extension_service_PreStartWorkspaceModifyRequest,
    responseSerialize: serialize_extension_service_PreStartWorkspaceModifyResponse,
    responseDeserialize: deserialize_extension_service_PreStartWorkspaceModifyResponse,
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
    path: '/extension_service.ExtensionService/preStartImageBuildWorkspaceNotifyHook',
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
preCallImageBuilderModifyHook: {
    path: '/extension_service.ExtensionService/preCallImageBuilderModifyHook',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.PreCallImageBuilderModifyRequest,
    responseType: service_pb.PreCallImageBuilderModifyResponse,
    requestSerialize: serialize_extension_service_PreCallImageBuilderModifyRequest,
    requestDeserialize: deserialize_extension_service_PreCallImageBuilderModifyRequest,
    responseSerialize: serialize_extension_service_PreCallImageBuilderModifyResponse,
    responseDeserialize: deserialize_extension_service_PreCallImageBuilderModifyResponse,
  },
};

exports.ExtensionServiceClient = grpc.makeGenericClientConstructor(ExtensionServiceService);
