import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { MessageTemplateV1 } from '../../data/version1/MessageTemplateV1';
export declare class MessageTemplatesGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromMessageTemplate(template: MessageTemplateV1): any;
    static toMessageTemplate(obj: any): MessageTemplateV1;
    static fromMessageTemplatePage(page: DataPage<MessageTemplateV1>): any;
    static toMessageTemplatePage(obj: any): DataPage<MessageTemplateV1>;
}
