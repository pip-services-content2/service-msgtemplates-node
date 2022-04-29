import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class MessageTemplateV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('from', TypeCode.String);
        this.withRequiredProperty('subject', TypeCode.Map);
        this.withRequiredProperty('text', TypeCode.Map);
        this.withOptionalProperty('html', TypeCode.Map);
        this.withOptionalProperty('status', TypeCode.String);
    }
}
