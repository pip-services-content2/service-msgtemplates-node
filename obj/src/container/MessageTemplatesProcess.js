"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const MessageTemplatesServiceFactory_1 = require("../build/MessageTemplatesServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class MessageTemplatesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("message_templates", "Message templates microservice");
        this._factories.add(new MessageTemplatesServiceFactory_1.MessageTemplatesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.MessageTemplatesProcess = MessageTemplatesProcess;
//# sourceMappingURL=MessageTemplatesProcess.js.map