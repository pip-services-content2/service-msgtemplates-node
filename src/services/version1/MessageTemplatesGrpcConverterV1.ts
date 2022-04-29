const messages = require('../../../../src/protos/msgtemplates_v1_pb');

import { DataPage, MultiString } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../../data/version1/MessageTemplateV1';

export class MessageTemplatesGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MessageTemplatesGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        MessageTemplatesGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromMessageTemplate(template: MessageTemplateV1): any {
        if (template == null) return null;

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

    public static toMessageTemplate(obj: any): MessageTemplateV1 {
        if (obj == null) return null;

        let template: MessageTemplateV1 = {
            id: obj.getId(),
            name: obj.getName(),
            from: obj.getFrom(),
            subject: new MultiString(),
            text: new MultiString(),
            html: new MultiString(),
            status: obj.getStatus()
        };

        MessageTemplatesGrpcConverterV1.setMap(template.subject, obj.getSubjectMap());
        MessageTemplatesGrpcConverterV1.setMap(template.text, obj.getTextMap());
        MessageTemplatesGrpcConverterV1.setMap(template.html, obj.getHtmlMap());
       
        return template;
    }

    public static fromMessageTemplatePage(page: DataPage<MessageTemplateV1>): any {
        if (page == null) return null;

        let obj = new messages.MessageTemplatePage();

        obj.setTotal(page.total);
        let data = page.data.map(MessageTemplatesGrpcConverterV1.fromMessageTemplate);
        obj.setDataList(data);

        return obj;
    }

    public static toMessageTemplatePage(obj: any): DataPage<MessageTemplateV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(MessageTemplatesGrpcConverterV1.toMessageTemplate);
        let page: DataPage<MessageTemplateV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}