const assert = require('chai').assert;

import { ConfigParams, MultiString } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesLambdaFunction } from '../../src/container/MessageTemplatesLambdaFunction';

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

suite('MessageTemplatesLambdaFunction', ()=> {
    let lambda: MessageTemplatesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-msgtemplates:persistence:memory:default:1.0',
            'controller.descriptor', 'service-msgtemplates:controller:default:default:1.0'
        );

        lambda = new MessageTemplatesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let template1, template2;

        // Create one template
        template1 = await lambda.act(
            {
                role: 'message_templates',
                cmd: 'create_template',
                template: TEMPLATE1
            }
        );

        assert.isObject(template1);
        assert.equal(template1.name, TEMPLATE1.name);
        assert.equal(template1.text.en, TEMPLATE1.text.get('en'));

        // Create another template
        template2 = await lambda.act(
            {
                role: 'message_templates',
                cmd: 'create_template',
                template: TEMPLATE2
            }
        );

        assert.isObject(template2);
        assert.equal(template2.name, TEMPLATE2.name);
        assert.equal(template2.text.en, TEMPLATE2.text.get('en'));

        // Get all templates
        let page = await lambda.act(
            {
                role: 'message_templates',
                cmd: 'get_templates'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the template
        template1.text = new MultiString({ en: 'Updated Content 1' });
        template1 = await lambda.act(
            {
                role: 'message_templates',
                cmd: 'update_template',
                template: template1
            }
        );

        assert.isObject(template1);
        assert.equal(template1.text.en, 'Updated Content 1');
        assert.equal(template1.name, TEMPLATE1.name);

        // Delete template
        await lambda.act(
            {
                role: 'message_templates',
                cmd: 'delete_template_by_id',
                template_id: template1.id
            }
        );

        // Try to get delete template
        let template = await lambda.act(
            {
                role: 'message_templates',
                cmd: 'get_template_by_id',
                template_id: template1.id
            }
        );

        assert.isNull(template || null);
    });
});