import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';

import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../data/version1/MessageTemplateStatusV1';
import { IMessageTemplatesPersistence } from '../persistence/IMessageTemplatesPersistence';
import { IMessageTemplatesController } from './IMessageTemplatesController';
import { MessageTemplatesCommandSet } from './MessageTemplatesCommandSet';

export class MessageTemplatesController implements  IConfigurable, IReferenceable, ICommandable, IMessageTemplatesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-msgtemplates:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(MessageTemplatesController._defaultConfig);
    private _persistence: IMessageTemplatesPersistence;
    private _commandSet: MessageTemplatesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IMessageTemplatesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new MessageTemplatesCommandSet(this);
        return this._commandSet;
    }
    
    public async getTemplates(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MessageTemplateV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getTemplateById(correlationId: string, id: string): Promise<MessageTemplateV1> {
        return await this._persistence.getOneById(correlationId, id);        
    }

    public async getTemplateByIdOrName(correlationId: string, idOrName: string): Promise<MessageTemplateV1> {
        return await this._persistence.getOneByIdOrName(correlationId, idOrName);
    }

    public async createTemplate(correlationId: string, template: MessageTemplateV1): Promise<MessageTemplateV1> {

        template.id = template.id || IdGenerator.nextLong();
        template.status = template.status || MessageTemplateStatusV1.New;

        return await this._persistence.create(correlationId, template);
    }

    public async updateTemplate(correlationId: string, template: MessageTemplateV1): Promise<MessageTemplateV1> {

        template.status = template.status || MessageTemplateStatusV1.New;

        return await this._persistence.update(correlationId, template);
    }

    public async deleteTemplateById(correlationId: string, id: string): Promise<MessageTemplateV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
