// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var msgtemplates_v1_pb = require('./msgtemplates_v1_pb.js');

function serialize_msgtemplates_v1_MessageTemplateIdRequest(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplateIdRequest)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplateIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplateIdRequest(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplateIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgtemplates_v1_MessageTemplateNameRequest(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplateNameRequest)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplateNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplateNameRequest(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplateNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgtemplates_v1_MessageTemplateObjectReply(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplateObjectReply)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplateObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplateObjectReply(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplateObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgtemplates_v1_MessageTemplateObjectRequest(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplateObjectRequest)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplateObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplateObjectRequest(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplateObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgtemplates_v1_MessageTemplatePageReply(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplatePageReply)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplatePageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplatePageReply(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplatePageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgtemplates_v1_MessageTemplatePageRequest(arg) {
  if (!(arg instanceof msgtemplates_v1_pb.MessageTemplatePageRequest)) {
    throw new Error('Expected argument of type msgtemplates_v1.MessageTemplatePageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgtemplates_v1_MessageTemplatePageRequest(buffer_arg) {
  return msgtemplates_v1_pb.MessageTemplatePageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The templates service definition.
var MessageTemplatesService = exports.MessageTemplatesService = {
  get_templates: {
    path: '/msgtemplates_v1.MessageTemplates/get_templates',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplatePageRequest,
    responseType: msgtemplates_v1_pb.MessageTemplatePageReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplatePageRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplatePageRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplatePageReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplatePageReply,
  },
  get_template_by_id: {
    path: '/msgtemplates_v1.MessageTemplates/get_template_by_id',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplateIdRequest,
    responseType: msgtemplates_v1_pb.MessageTemplateObjectReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplateIdRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplateIdRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplateObjectReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectReply,
  },
  get_template_by_id_or_name: {
    path: '/msgtemplates_v1.MessageTemplates/get_template_by_id_or_name',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplateNameRequest,
    responseType: msgtemplates_v1_pb.MessageTemplateObjectReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplateNameRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplateNameRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplateObjectReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectReply,
  },
  create_template: {
    path: '/msgtemplates_v1.MessageTemplates/create_template',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplateObjectRequest,
    responseType: msgtemplates_v1_pb.MessageTemplateObjectReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplateObjectRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplateObjectReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectReply,
  },
  update_template: {
    path: '/msgtemplates_v1.MessageTemplates/update_template',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplateObjectRequest,
    responseType: msgtemplates_v1_pb.MessageTemplateObjectReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplateObjectRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplateObjectReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectReply,
  },
  delete_template_by_id: {
    path: '/msgtemplates_v1.MessageTemplates/delete_template_by_id',
    requestStream: false,
    responseStream: false,
    requestType: msgtemplates_v1_pb.MessageTemplateIdRequest,
    responseType: msgtemplates_v1_pb.MessageTemplateObjectReply,
    requestSerialize: serialize_msgtemplates_v1_MessageTemplateIdRequest,
    requestDeserialize: deserialize_msgtemplates_v1_MessageTemplateIdRequest,
    responseSerialize: serialize_msgtemplates_v1_MessageTemplateObjectReply,
    responseDeserialize: deserialize_msgtemplates_v1_MessageTemplateObjectReply,
  },
};

exports.MessageTemplatesClient = grpc.makeGenericClientConstructor(MessageTemplatesService);
