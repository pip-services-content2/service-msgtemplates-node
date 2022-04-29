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
exports.MessageTemplatesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const MessageTemplateStatusV1_1 = require("../data/version1/MessageTemplateStatusV1");
const MessageTemplatesCommandSet_1 = require("./MessageTemplatesCommandSet");
class MessageTemplatesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(MessageTemplatesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new MessageTemplatesCommandSet_1.MessageTemplatesCommandSet(this);
        return this._commandSet;
    }
    getTemplates(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getTemplateById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    getTemplateByIdOrName(correlationId, idOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneByIdOrName(correlationId, idOrName);
        });
    }
    createTemplate(correlationId, template) {
        return __awaiter(this, void 0, void 0, function* () {
            template.id = template.id || pip_services3_commons_nodex_3.IdGenerator.nextLong();
            template.status = template.status || MessageTemplateStatusV1_1.MessageTemplateStatusV1.New;
            return yield this._persistence.create(correlationId, template);
        });
    }
    updateTemplate(correlationId, template) {
        return __awaiter(this, void 0, void 0, function* () {
            template.status = template.status || MessageTemplateStatusV1_1.MessageTemplateStatusV1.New;
            return yield this._persistence.update(correlationId, template);
        });
    }
    deleteTemplateById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.deleteById(correlationId, id);
        });
    }
}
exports.MessageTemplatesController = MessageTemplatesController;
MessageTemplatesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-msgtemplates:persistence:*:*:1.0');
//# sourceMappingURL=MessageTemplatesController.js.map