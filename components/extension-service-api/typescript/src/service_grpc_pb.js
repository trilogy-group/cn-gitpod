/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service_pb = require('./service_pb.js');

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
};

exports.ExtensionServiceClient = grpc.makeGenericClientConstructor(ExtensionServiceService);
