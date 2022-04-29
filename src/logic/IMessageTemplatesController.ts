import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';

export interface IMessageTemplatesController {
    getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MessageTemplateV1>>;

    getTemplateById(correlationId: string, id: string): Promise<MessageTemplateV1>;

    getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<MessageTemplateV1>;

    createTemplate(correlationId: string, template: MessageTemplateV1): Promise<MessageTemplateV1>;

    updateTemplate(correlationId: string, template: MessageTemplateV1): Promise<MessageTemplateV1>;

    deleteTemplateById(correlationId: string, id: string): Promise<MessageTemplateV1>;
}
