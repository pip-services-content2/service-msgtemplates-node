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
exports.MessageTemplatesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const MessageTemplateV1Schema_1 = require("../data/version1/MessageTemplateV1Schema");
class MessageTemplatesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetMessageTemplatesCommand());
        this.addCommand(this.makeGetMessageTemplateByIdCommand());
        this.addCommand(this.makeGetMessageTemplateByIdOrNameCommand());
        this.addCommand(this.makeCreateMessageTemplateCommand());
        this.addCommand(this.makeUpdateMessageTemplateCommand());
        this.addCommand(this.makeDeleteMessageTemplateByIdCommand());
    }
    makeGetMessageTemplatesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_templates", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getTemplates(correlationId, filter, paging);
        }));
    }
    makeGetMessageTemplateByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_template_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('template_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsString("template_id");
            return yield this._logic.getTemplateById(correlationId, id);
        }));
    }
    makeGetMessageTemplateByIdOrNameCommand() {
        return new pip_services3_commons_nodex_2.Command("get_template_by_id_or_name", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('id_or_name', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let idOrName = args.getAsString("id_or_name");
            return yield this._logic.getTemplateByIdOrName(correlationId, idOrName);
        }));
    }
    makeCreateMessageTemplateCommand() {
        return new pip_services3_commons_nodex_2.Command("create_template", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('template', new MessageTemplateV1Schema_1.MessageTemplateV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let template = args.get("template");
            return yield this._logic.createTemplate(correlationId, template);
        }));
    }
    makeUpdateMessageTemplateCommand() {
        return new pip_services3_commons_nodex_2.Command("update_template", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('template', new MessageTemplateV1Schema_1.MessageTemplateV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let template = args.get("template");
            return yield this._logic.updateTemplate(correlationId, template);
        }));
    }
    makeDeleteMessageTemplateByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_template_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('template_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("template_id");
            return yield this._logic.deleteTemplateById(correlationId, id);
        }));
    }
}
exports.MessageTemplatesCommandSet = MessageTemplatesCommandSet;
//# sourceMappingURL=MessageTemplatesCommandSet.js.map