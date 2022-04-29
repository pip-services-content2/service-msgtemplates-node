import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';
import { IMessageTemplatesPersistence } from './IMessageTemplatesPersistence';

export class MessageTemplatesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<MessageTemplateV1, string> 
    implements IMessageTemplatesPersistence {

    constructor() {
        super('msgtemplates');
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ status: { $regex: searchRegex } });
            searchCriteria.push({ 'subject.en': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.de': { $regex: searchRegex } });
            searchCriteria.push({ 'subject.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'text.en': { $regex: searchRegex } });
            searchCriteria.push({ 'text.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'text.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'text.de': { $regex: searchRegex } });
            searchCriteria.push({ 'text.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'html.en': { $regex: searchRegex } });
            searchCriteria.push({ 'html.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'html.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'html.de': { $regex: searchRegex } });
            searchCriteria.push({ 'html.ru': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MessageTemplateV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByIdOrName(correlationId: string, idOrName): Promise<MessageTemplateV1> {
        let filter = { 
            $or: [
                { _id: idOrName },
                { name: idOrName }
            ]
        };
        
        return await new Promise<any>((resolve, reject) => { 
            this._collection.findOne(filter, (err, item) => {
                if (!err)
                    this._logger.trace(correlationId, "Retrieved from %s by %s", this._collection, idOrName);

                if (item == null) {
                    let err = new NotFoundException(
                        correlationId,
                        'TEMPLATE_NOT_FOUND',
                        'Message template ' + idOrName + ' was not found'
                    ).withDetails('id_or_name', idOrName);

                    reject(err);
                }

                item = this.convertToPublic(item);
                resolve(item);
            });
        });   
    }
}
