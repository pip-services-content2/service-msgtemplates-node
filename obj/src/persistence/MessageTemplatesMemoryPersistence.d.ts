import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { IMessageTemplatesPersistence } from './IMessageTemplatesPersistence';
export declare class MessageTemplatesMemoryPersistence extends IdentifiableMemoryPersistence<MessageTemplateV1, string> implements IMessageTemplatesPersistence {
    constructor();
    private matchString;
    private matchMultilanguageString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MessageTemplateV1>>;
    getOneByIdOrName(correlationId: string, idOrName: string): Promise<MessageTemplateV1>;
}
