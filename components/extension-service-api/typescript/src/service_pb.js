/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

// source: service.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.extension_service.PreStartWorkspace', null, global);
goog.exportSymbol('proto.extension_service.PreStartWorkspaceConfig', null, global);
goog.exportSymbol('proto.extension_service.PreStartWorkspaceInstance', null, global);
goog.exportSymbol('proto.extension_service.PreStartWorkspaceNotifyRequest', null, global);
goog.exportSymbol('proto.extension_service.PreStartWorkspaceNotifyResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.extension_service.PreStartWorkspaceNotifyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.extension_service.PreStartWorkspaceNotifyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.extension_service.PreStartWorkspaceNotifyRequest.displayName = 'proto.extension_service.PreStartWorkspaceNotifyRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.extension_service.PreStartWorkspaceNotifyResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.extension_service.PreStartWorkspaceNotifyResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.extension_service.PreStartWorkspaceNotifyResponse.displayName = 'proto.extension_service.PreStartWorkspaceNotifyResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.extension_service.PreStartWorkspace = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.extension_service.PreStartWorkspace, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.extension_service.PreStartWorkspace.displayName = 'proto.extension_service.PreStartWorkspace';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.extension_service.PreStartWorkspaceConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.extension_service.PreStartWorkspaceConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.extension_service.PreStartWorkspaceConfig.displayName = 'proto.extension_service.PreStartWorkspaceConfig';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.extension_service.PreStartWorkspaceInstance = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.extension_service.PreStartWorkspaceInstance, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.extension_service.PreStartWorkspaceInstance.displayName = 'proto.extension_service.PreStartWorkspaceInstance';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.extension_service.PreStartWorkspaceNotifyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.extension_service.PreStartWorkspaceNotifyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    workspace: (f = msg.getWorkspace()) && proto.extension_service.PreStartWorkspace.toObject(includeInstance, f),
    instance: (f = msg.getInstance()) && proto.extension_service.PreStartWorkspaceInstance.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.extension_service.PreStartWorkspaceNotifyRequest;
  return proto.extension_service.PreStartWorkspaceNotifyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.extension_service.PreStartWorkspaceNotifyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.extension_service.PreStartWorkspace;
      reader.readMessage(value,proto.extension_service.PreStartWorkspace.deserializeBinaryFromReader);
      msg.setWorkspace(value);
      break;
    case 2:
      var value = new proto.extension_service.PreStartWorkspaceInstance;
      reader.readMessage(value,proto.extension_service.PreStartWorkspaceInstance.deserializeBinaryFromReader);
      msg.setInstance(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.extension_service.PreStartWorkspaceNotifyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.extension_service.PreStartWorkspaceNotifyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorkspace();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.extension_service.PreStartWorkspace.serializeBinaryToWriter
    );
  }
  f = message.getInstance();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.extension_service.PreStartWorkspaceInstance.serializeBinaryToWriter
    );
  }
};


/**
 * optional PreStartWorkspace workspace = 1;
 * @return {?proto.extension_service.PreStartWorkspace}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.getWorkspace = function() {
  return /** @type{?proto.extension_service.PreStartWorkspace} */ (
    jspb.Message.getWrapperField(this, proto.extension_service.PreStartWorkspace, 1));
};


/**
 * @param {?proto.extension_service.PreStartWorkspace|undefined} value
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest} returns this
*/
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.setWorkspace = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest} returns this
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.clearWorkspace = function() {
  return this.setWorkspace(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.hasWorkspace = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional PreStartWorkspaceInstance instance = 2;
 * @return {?proto.extension_service.PreStartWorkspaceInstance}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.getInstance = function() {
  return /** @type{?proto.extension_service.PreStartWorkspaceInstance} */ (
    jspb.Message.getWrapperField(this, proto.extension_service.PreStartWorkspaceInstance, 2));
};


/**
 * @param {?proto.extension_service.PreStartWorkspaceInstance|undefined} value
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest} returns this
*/
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.setInstance = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyRequest} returns this
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.clearInstance = function() {
  return this.setInstance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.extension_service.PreStartWorkspaceNotifyRequest.prototype.hasInstance = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.extension_service.PreStartWorkspaceNotifyResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.extension_service.PreStartWorkspaceNotifyResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyResponse}
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.extension_service.PreStartWorkspaceNotifyResponse;
  return proto.extension_service.PreStartWorkspaceNotifyResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.extension_service.PreStartWorkspaceNotifyResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.extension_service.PreStartWorkspaceNotifyResponse}
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.extension_service.PreStartWorkspaceNotifyResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.extension_service.PreStartWorkspaceNotifyResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceNotifyResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.extension_service.PreStartWorkspace.prototype.toObject = function(opt_includeInstance) {
  return proto.extension_service.PreStartWorkspace.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.extension_service.PreStartWorkspace} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspace.toObject = function(includeInstance, msg) {
  var f, obj = {
    config: (f = msg.getConfig()) && proto.extension_service.PreStartWorkspaceConfig.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.extension_service.PreStartWorkspace}
 */
proto.extension_service.PreStartWorkspace.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.extension_service.PreStartWorkspace;
  return proto.extension_service.PreStartWorkspace.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.extension_service.PreStartWorkspace} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.extension_service.PreStartWorkspace}
 */
proto.extension_service.PreStartWorkspace.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.extension_service.PreStartWorkspaceConfig;
      reader.readMessage(value,proto.extension_service.PreStartWorkspaceConfig.deserializeBinaryFromReader);
      msg.setConfig(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.extension_service.PreStartWorkspace.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.extension_service.PreStartWorkspace.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.extension_service.PreStartWorkspace} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspace.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.extension_service.PreStartWorkspaceConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional PreStartWorkspaceConfig config = 1;
 * @return {?proto.extension_service.PreStartWorkspaceConfig}
 */
proto.extension_service.PreStartWorkspace.prototype.getConfig = function() {
  return /** @type{?proto.extension_service.PreStartWorkspaceConfig} */ (
    jspb.Message.getWrapperField(this, proto.extension_service.PreStartWorkspaceConfig, 1));
};


/**
 * @param {?proto.extension_service.PreStartWorkspaceConfig|undefined} value
 * @return {!proto.extension_service.PreStartWorkspace} returns this
*/
proto.extension_service.PreStartWorkspace.prototype.setConfig = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.extension_service.PreStartWorkspace} returns this
 */
proto.extension_service.PreStartWorkspace.prototype.clearConfig = function() {
  return this.setConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.extension_service.PreStartWorkspace.prototype.hasConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.extension_service.PreStartWorkspaceConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.extension_service.PreStartWorkspaceConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.extension_service.PreStartWorkspaceConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
    arch: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.extension_service.PreStartWorkspaceConfig}
 */
proto.extension_service.PreStartWorkspaceConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.extension_service.PreStartWorkspaceConfig;
  return proto.extension_service.PreStartWorkspaceConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.extension_service.PreStartWorkspaceConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.extension_service.PreStartWorkspaceConfig}
 */
proto.extension_service.PreStartWorkspaceConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setArch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.extension_service.PreStartWorkspaceConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.extension_service.PreStartWorkspaceConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.extension_service.PreStartWorkspaceConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getArch();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string arch = 1;
 * @return {string}
 */
proto.extension_service.PreStartWorkspaceConfig.prototype.getArch = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.extension_service.PreStartWorkspaceConfig} returns this
 */
proto.extension_service.PreStartWorkspaceConfig.prototype.setArch = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.extension_service.PreStartWorkspaceInstance.prototype.toObject = function(opt_includeInstance) {
  return proto.extension_service.PreStartWorkspaceInstance.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.extension_service.PreStartWorkspaceInstance} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceInstance.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.extension_service.PreStartWorkspaceInstance}
 */
proto.extension_service.PreStartWorkspaceInstance.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.extension_service.PreStartWorkspaceInstance;
  return proto.extension_service.PreStartWorkspaceInstance.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.extension_service.PreStartWorkspaceInstance} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.extension_service.PreStartWorkspaceInstance}
 */
proto.extension_service.PreStartWorkspaceInstance.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.extension_service.PreStartWorkspaceInstance.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.extension_service.PreStartWorkspaceInstance.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.extension_service.PreStartWorkspaceInstance} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.extension_service.PreStartWorkspaceInstance.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.extension_service.PreStartWorkspaceInstance.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.extension_service.PreStartWorkspaceInstance} returns this
 */
proto.extension_service.PreStartWorkspaceInstance.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.extension_service);
