"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/msgtemplates_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class MessageTemplatesGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_3.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        MessageTemplatesGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MessageTemplatesGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_4.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        MessageTemplatesGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_2.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromMessageTemplate(template) {
        if (template == null)
            return null;
        let obj = new messages.MessageTemplate();
        obj.setId(template.id);
        obj.setName(template.name);
        obj.setFrom(template.from);
        MessageTemplatesGrpcConverterV1.setMap(obj.getSubjectMap(), template.subject);
        MessageTemplatesGrpcConverterV1.setMap(obj.getTextMap(), template.text);
        MessageTemplatesGrpcConverterV1.setMap(obj.getHtmlMap(), template.html);
        obj.setStatus(template.status);
        return obj;
    }
    static toMessageTemplate(obj) {
        if (obj == null)
            return null;
        let template = {
            id: obj.getId(),
            name: obj.getName(),
            from: obj.getFrom(),
            subject: new pip_services3_commons_nodex_1.MultiString(),
            text: new pip_services3_commons_nodex_1.MultiString(),
            html: new pip_services3_commons_nodex_1.MultiString(),
            status: obj.getStatus()
        };
        MessageTemplatesGrpcConverterV1.setMap(template.subject, obj.getSubjectMap());
        MessageTemplatesGrpcConverterV1.setMap(template.text, obj.getTextMap());
        MessageTemplatesGrpcConverterV1.setMap(template.html, obj.getHtmlMap());
        return template;
    }
    static fromMessageTemplatePage(page) {
        if (page == null)
            return null;
        let obj = new messages.MessageTemplatePage();
        obj.setTotal(page.total);
        let data = page.data.map(MessageTemplatesGrpcConverterV1.fromMessageTemplate);
        obj.setDataList(data);
        return obj;
    }
    static toMessageTemplatePage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(MessageTemplatesGrpcConverterV1.toMessageTemplate);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.MessageTemplatesGrpcConverterV1 = MessageTemplatesGrpcConverterV1;
//# sourceMappingURL=MessageTemplatesGrpcConverterV1.js.map