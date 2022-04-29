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
import { MessageTemplatesGrpcServiceV1 } from '../../../src/services/version1/MessageTemplatesGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3002
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

suite('MessageTemplatesGrpcServiceV1', ()=> {
    let service: MessageTemplatesGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new MessageTemplatesMemoryPersistence();
        let controller = new MessageTemplatesController();

        service = new MessageTemplatesGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-msgtemplates', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-msgtemplates', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-msgtemplates', 'service', 'grpc', 'default', '1.0'), service
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
            __dirname + "../../../../../src/protos/msgtemplates_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).msgtemplates_v1.MessageTemplates;

        client = new clientProto('localhost:3002', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let template1, template2;

        // Create one template
        template1 = await new Promise<any>((resolve, reject) => {
            client.create_template(
                {
                    template: TEMPLATE1
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.template);
                }
            );
        });

        assert.isObject(template1);
        assert.equal(template1.name, TEMPLATE1.name);
        assert.equal(template1.text.en, TEMPLATE1.text.get('en'));

        // Create another template
        template2 = await new Promise<any>((resolve, reject) => {
            client.create_template(
                {
                    template: TEMPLATE2
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.template);
                }
            );
        });

        assert.isObject(template2);
        assert.equal(template2.name, TEMPLATE2.name);
        assert.equal(template2.text.en, TEMPLATE2.text.get('en'));

        // Get all templates
        let page = await new Promise<any>((resolve, reject) => {
            client.get_templates(
                {},
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.page);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the template
        template1.text = new MultiString({ en: 'Updated Content 1' });

        template1 = await new Promise<any>((resolve, reject) => {
            client.update_template(
                {
                    template: template1
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.template);
                }
            );
        });

        assert.isObject(template1);
        assert.equal(template1.text.en, 'Updated Content 1');
        assert.equal(template1.name, TEMPLATE1.name);

        // Delete template
        let template = await new Promise<any>((resolve, reject) => {
            client.delete_template_by_id(
                {
                    template_id: template1.id
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.template);
                }
            );
        });

        assert.isObject(template);
        assert.equal(template.id, template1.id);

        // Try to get delete template
        template = await new Promise<any>((resolve, reject) => {
            client.get_template_by_id(
                {
                    template_id: template1.id
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response.template);
                }
            );
        });

        assert.isNull(template);
    });

});
