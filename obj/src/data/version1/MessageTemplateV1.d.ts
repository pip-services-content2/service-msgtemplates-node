import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
export declare class MessageTemplateV1 implements IStringIdentifiable {
    id: string;
    name: string;
    from: string;
    subject: MultiString;
    text: MultiString;
    html: MultiString;
    status: string;
}
