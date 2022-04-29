"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const MessageTemplatesMongoDbPersistence_1 = require("../persistence/MessageTemplatesMongoDbPersistence");
const MessageTemplatesFilePersistence_1 = require("../persistence/MessageTemplatesFilePersistence");
const MessageTemplatesMemoryPersistence_1 = require("../persistence/MessageTemplatesMemoryPersistence");
const MessageTemplatesController_1 = require("../logic/MessageTemplatesController");
const MessageTemplatesHttpServiceV1_1 = require("../services/version1/MessageTemplatesHttpServiceV1");
const MessageTemplatesCommandableGrpcServiceV1_1 = require("../services/version1/MessageTemplatesCommandableGrpcServiceV1");
const MessageTemplatesGrpcServiceV1_1 = require("../services/version1/MessageTemplatesGrpcServiceV1");
class MessageTemplatesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(MessageTemplatesServiceFactory.MemoryPersistenceDescriptor, MessageTemplatesMemoryPersistence_1.MessageTemplatesMemoryPersistence);
        this.registerAsType(MessageTemplatesServiceFactory.FilePersistenceDescriptor, MessageTemplatesFilePersistence_1.MessageTemplatesFilePersistence);
        this.registerAsType(MessageTemplatesServiceFactory.MongoDbPersistenceDescriptor, MessageTemplatesMongoDbPersistence_1.MessageTemplatesMongoDbPersistence);
        this.registerAsType(MessageTemplatesServiceFactory.ControllerDescriptor, MessageTemplatesController_1.MessageTemplatesController);
        this.registerAsType(MessageTemplatesServiceFactory.HttpServiceDescriptor, MessageTemplatesHttpServiceV1_1.MessageTemplatesHttpServiceV1);
        this.registerAsType(MessageTemplatesServiceFactory.CommandableGrpcServiceDescriptor, MessageTemplatesCommandableGrpcServiceV1_1.MessageTemplatesCommandableGrpcServiceV1);
        this.registerAsType(MessageTemplatesServiceFactory.GrpcServiceDescriptor, MessageTemplatesGrpcServiceV1_1.MessageTemplatesGrpcServiceV1);
    }
}
exports.MessageTemplatesServiceFactory = MessageTemplatesServiceFactory;
MessageTemplatesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "factory", "default", "default", "1.0");
MessageTemplatesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "persistence", "memory", "*", "1.0");
MessageTemplatesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "persistence", "file", "*", "1.0");
MessageTemplatesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "persistence", "mongodb", "*", "1.0");
MessageTemplatesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "controller", "default", "*", "1.0");
MessageTemplatesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "service", "http", "*", "1.0");
MessageTemplatesServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "service", "commandable-grpc", "*", "1.0");
MessageTemplatesServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "service", "grpc", "*", "1.0");
//# sourceMappingURL=MessageTemplatesServiceFactory.js.map