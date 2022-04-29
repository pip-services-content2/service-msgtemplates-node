const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { MessageTemplateV1 } from '../../../src/data/version1/MessageTemplateV1';
import { MessageTemplateStatusV1 } from '../../../src/data/version1/MessageTemplateStatusV1';
import { MessageTemplatesMemoryPersistence } from '../../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesController } from '../../../src/logic/MessageTemplatesController';
import { MessageTemplatesCommandableGrpcServiceV1 } from '../../../src/services/version1/MessageTemplatesCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
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

suite('MessageTemplatesCommandableGrpcServiceV1', ()=> {
    let service: MessageTemplatesCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new MessageTemplatesMemoryPersistence();
        let controller = new MessageTemplatesController();

        service = new MessageTemplatesCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgtemplates', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let template1, template2;

        // Create one template
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.create_template',
                    args_empty: false,
                    args_json: JSON.stringify({
                        template: TEMPLATE1
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let template = JSON.parse(response.result_json);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE1.name);
        assert.equal(template.text.en, TEMPLATE1.text.get('en'));

        template1 = template;

        // Create another template
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.create_template',
                    args_empty: false,
                    args_json: JSON.stringify({
                        template: TEMPLATE2
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        template = JSON.parse(response.result_json);

        assert.isObject(template);
        assert.equal(template.name, TEMPLATE2.name);
        assert.equal(template.text.en, TEMPLATE2.text.get('en'));

        template2 = template;

        // Get all templates
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.get_templates',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the template
        template1.text = new MultiString({ en: 'Updated Content 1' });
        
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.update_template',
                    args_empty: false,
                    args_json: JSON.stringify({
                        template: template1
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        template = JSON.parse(response.result_json);

        assert.isObject(template);
        assert.equal(template.text.en, 'Updated Content 1');
        assert.equal(template.name, TEMPLATE1.name);

        template1 = template;

        // Delete template
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.delete_template_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        template_id: template1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        template = JSON.parse(response.result_json);

        assert.isObject(template);
        assert.equal(template.id, template1.id);

        // Try to get delete template
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/message_templates.get_template_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        template_id: template1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isTrue(response.result_empty);

    });

});
