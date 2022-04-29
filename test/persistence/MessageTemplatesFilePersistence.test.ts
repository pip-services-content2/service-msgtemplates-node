import { MessageTemplatesFilePersistence } from '../../src/persistence/MessageTemplatesFilePersistence';
import { MessageTemplatesPersistenceFixture } from './MessageTemplatesPersistenceFixture';

suite('MessageTemplatesFilePersistence', ()=> {
    let persistence: MessageTemplatesFilePersistence;
    let fixture: MessageTemplatesPersistenceFixture;
    
    setup(async () => {
        persistence = new MessageTemplatesFilePersistence('./data/message_templates.test.json');

        fixture = new MessageTemplatesPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});