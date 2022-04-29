const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../../src/logic/MessageTemplatesController';
import { MessageTemplatesHttpServiceV1 } from '../../../src/services/version1/MessageTemplatesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('MessageTemplatesHttpServiceV1', ()=> {    
    let service: MessageTemplatesHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new MessageTemplatesMemoryPersistence();
        let controller = new MessageTemplatesController();

        service = new MessageTemplatesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgtemplates', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', async () => {
        let template1, template2;

        // Create one template
        template1 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/create_template',
                {
                    template: TEMPLATE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template1);
        assert.equal(template1.name, TEMPLATE1.name);
        assert.equal(template1.text.en, TEMPLATE1.text.get('en'));

        // Create another template
        template2 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/create_template',
                {
                    template: TEMPLATE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template2);
        assert.equal(template2.name, TEMPLATE2.name);
        assert.equal(template2.text.en, TEMPLATE2.text.get('en'));

        // Get all templates
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/get_templates',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        
        // Update the template
        template1.text = { en: 'Updated Content 1' };

        let template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/update_template',
                {
                    template: template1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.text.en, 'Updated Content 1');
        assert.equal(template.name, TEMPLATE1.name);

        template1 = template;

        // Delete template
        template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/delete_template_by_id',
                {
                    template_id: template1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.id, template1.id);

        // Try to get delete template
        template = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/message_templates/get_template_by_id',
                {
                    template_id: template1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(Object.keys(result).length != 0 ? result : null);
                    else reject(err);
                }
            );
        });

        assert.isNull(template);
    });
});