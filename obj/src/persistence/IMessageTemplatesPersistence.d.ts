import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
export interface IMessageTemplatesPersistence extends IGetter<MessageTemplateV1, string>, IWriter<MessageTemplateV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MessageTemplateV1>>;
    getOneById(correlationId: string, id: string): Promise<MessageTemplateV1>;
    getOneByIdOrName(correlationId: string, idOrName: string): Promise<MessageTemplateV1>;
    create(correlationId: string, item: MessageTemplateV1): Promise<MessageTemplateV1>;
    update(correlationId: string, item: MessageTemplateV1): Promise<MessageTemplateV1>;
    deleteById(correlationId: string, id: string): Promise<MessageTemplateV1>;
}
