const assert = require('chai').assert;

import { FilterParams, MultiString } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../src/data/version1/MessageTemplateStatusV1';

import { IMessageTemplatesPersistence } from '../../src/persistence/IMessageTemplatesPersistence';

let TEMPLATE1: MessageTemplateV1 = {
    id: '1',
    name: 'template1',
    from: null,
    subject: new MultiString({ en: 'Text 1' }),
    text: new MultiString({ en: 'Text 1' }),
    html: new MultiString({ en: 'Text 1' }),
    status: MessageTemplateStatusV1.Completed
};
let TEMPLATE2: MessageTemplateV1 = {
    id: '2',
    name: 'template2',
    from: null,
    subject: new MultiString({ en: 'Text 2' }),
    text: new MultiString({ en: 'Text 2' }),
    html: new MultiString({ en: 'Text 2' }),
    status: MessageTemplateStatusV1.Completed
};
let TEMPLATE3: MessageTemplateV1 = {
    id: '3',
    name: 'template3',
    from: null,
    subject: new MultiString({ en: 'Text 2' }),
    text: new MultiString({ en: 'Text 2' }),
    html: new MultiString({ en: 'Text 2' }),
    status: MessageTemplateStatusV1.Translating
};

export class MessageTemplatesPersistenceFixture {
    private _persistence: IMessageTemplatesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateMessageTemplates() {

        // Create one template
        let template = await this._persistence.create(null, TEMPLATE1);
        
        assert.isObject(template);
        assert.equal(template.name, TEMPLATE1.name);
        assert.equal(template.status, TEMPLATE1.status);
        assert.equal(template.text.get('en'), TEMPLATE1.text.get('en'));

        // Create another template
        template = await this._persistence.create(null, TEMPLATE2);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE2.name);
        assert.equal(template.status, TEMPLATE2.status);
        assert.equal(template.text.get('en'), TEMPLATE2.text.get('en'));

        // Create yet another msgtemplate
        template = await this._persistence.create(null, TEMPLATE3);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE3.name);
        assert.equal(template.status, TEMPLATE3.status);
        assert.equal(template.text.get('en'), TEMPLATE3.text.get('en'));
    }
                
    public async testCrudOperations() {
        let template1: MessageTemplateV1;

        // Create items
        await this.testCreateMessageTemplates();

        // Get all msgtemplates
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        template1 = page.data[0];

        // Update the template
        // template1.text.put('en', 'Updated Content 1');
        template1.text = new MultiString({ en: 'Updated Content 1' });

        let template: MessageTemplateV1 = await this._persistence.update(null, template1);
        // template.text = MultiString.fromValue(template.text);

        assert.isObject(template);
        // assert.equal(template.text.get('en'), 'Updated Content 1');
        assert.equal(template.id, template1.id);

        // Get delete template by name
        template = await this._persistence.getOneByIdOrName(null, template1.name);

        assert.equal(template.id, template1.id);

        // Delete template
        await this._persistence.deleteById(null, template1.id);

        // Try to get delete template
        template = await this._persistence.getOneById(null, template1.id);

        assert.isNull(template || null);
    }

    public async testGetWithFilter() {

        // Create templates
        await this.testCreateMessageTemplates();

        // Get templates filtered by name
        let msgtemplates = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                name: TEMPLATE1.name
            }),
            new PagingParams(),
        );

        assert.isObject(msgtemplates);
        assert.lengthOf(msgtemplates.data, 1);

        // Get templates searched by substring
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: 'temp'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        // Get templates filtered by status
        msgtemplates = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                status: TEMPLATE3.status
            }),
            new PagingParams()
        );

        assert.isObject(msgtemplates);
        assert.lengthOf(msgtemplates.data, 1);

    }
}
