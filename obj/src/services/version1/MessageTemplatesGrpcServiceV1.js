"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/msgtemplates_v1_grpc_pb');
const messages = require('../../../../src/protos/msgtemplates_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const MessageTemplatesGrpcConverterV1_1 = require("./MessageTemplatesGrpcConverterV1");
class MessageTemplatesGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.MessageTemplatesService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-msgtemplates", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getTemplates(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.MessageTemplatePageReply();
            try {
                let result = yield this._controller.getTemplates(correlationId, filter, paging);
                let page = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplatePage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getTemplateById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let templateId = call.request.getTemplateId();
            let response = new messages.MessageTemplateObjectReply();
            try {
                let result = yield this._controller.getTemplateById(correlationId, templateId);
                let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
                response.setTemplate(template);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getTemplateByIdOrName(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let idOrName = call.request.getName();
            let response = new messages.MessageTemplateObjectReply();
            try {
                let result = yield this._controller.getTemplateByIdOrName(correlationId, idOrName);
                let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
                if (result)
                    response.setTemplate(template);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    createTemplate(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());
            let response = new messages.MessageTemplateObjectReply();
            try {
                let result = yield this._controller.createTemplate(correlationId, template);
                let grpcTemplateObj = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
                if (result)
                    response.setTemplate(grpcTemplateObj);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    updateTemplate(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let template = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());
            let response = new messages.MessageTemplateObjectReply();
            try {
                let result = yield this._controller.updateTemplate(correlationId, template);
                let grpcTemplateObj = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
                if (result)
                    response.setTemplate(grpcTemplateObj);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteTemplateById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let templateId = call.request.getTemplateId();
            let response = new messages.MessageTemplateObjectReply();
            try {
                let result = yield this._controller.deleteTemplateById(correlationId, templateId);
                let grpcTemplateObj = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
                if (result)
                    response.setTemplate(grpcTemplateObj);
            }
            catch (err) {
                let error = MessageTemplatesGrpcConverterV1_1.MessageTemplatesGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_templates', null, this.getTemplates);
        this.registerMethod('get_template_by_id', null, this.getTemplateById);
        this.registerMethod('get_template_by_id_or_name', null, this.getTemplateByIdOrName);
        this.registerMethod('create_template', null, this.createTemplate);
        this.registerMethod('update_template', null, this.updateTemplate);
        this.registerMethod('delete_template_by_id', null, this.deleteTemplateById);
    }
}
exports.MessageTemplatesGrpcServiceV1 = MessageTemplatesGrpcServiceV1;
//# sourceMappingURL=MessageTemplatesGrpcServiceV1.js.map