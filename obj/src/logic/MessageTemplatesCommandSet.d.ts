import { CommandSet } from 'pip-services3-commons-nodex';
import { IMessageTemplatesController } from './IMessageTemplatesController';
export declare class MessageTemplatesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IMessageTemplatesController);
    private makeGetMessageTemplatesCommand;
    private makeGetMessageTemplateByIdCommand;
    private makeGetMessageTemplateByIdOrNameCommand;
    private makeCreateMessageTemplateCommand;
    private makeUpdateMessageTemplateCommand;
    private makeDeleteMessageTemplateByIdCommand;
}
