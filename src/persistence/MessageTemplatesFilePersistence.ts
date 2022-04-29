import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { MessageTemplatesMemoryPersistence } from './MessageTemplatesMemoryPersistence';
import { MessageTemplateV1 } from '../data/version1/MessageTemplateV1';

export class MessageTemplatesFilePersistence extends MessageTemplatesMemoryPersistence {
	protected _persister: JsonFilePersister<MessageTemplateV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<MessageTemplateV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}