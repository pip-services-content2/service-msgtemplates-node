"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplateV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class MessageTemplateV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('from', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('subject', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withRequiredProperty('text', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('html', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('status', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.MessageTemplateV1Schema = MessageTemplateV1Schema;
//# sourceMappingURL=MessageTemplateV1Schema.js.map