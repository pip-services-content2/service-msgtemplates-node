import { ConfigParams } from 'pip-services3-commons-nodex';

import { MessageTemplatesMemoryPersistence } from '../../src/persistence/MessageTemplatesMemoryPersistence';
import { MessageTemplatesPersistenceFixture } from './MessageTemplatesPersistenceFixture';

suite('MessageTemplatesMemoryPersistence', ()=> {
    let persistence: MessageTemplatesMemoryPersistence;
    let fixture: MessageTemplatesPersistenceFixture;
    
    setup(async () => {
        persistence = new MessageTemplatesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new MessageTemplatesPersistenceFixture(persistence);
        
        await persistence.open(null);
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