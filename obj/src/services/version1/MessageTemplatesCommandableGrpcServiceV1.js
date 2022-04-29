"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class MessageTemplatesCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/message_templates');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageTemplatesCommandableGrpcServiceV1 = MessageTemplatesCommandableGrpcServiceV1;
//# sourceMappingURL=MessageTemplatesCommandableGrpcServiceV1.js.map