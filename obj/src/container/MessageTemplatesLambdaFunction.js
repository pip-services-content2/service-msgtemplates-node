"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.MessageTemplatesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const MessageTemplatesServiceFactory_1 = require("../build/MessageTemplatesServiceFactory");
class MessageTemplatesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("message_templates", "Message templates function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-msgtemplates', 'controller', 'default', '*', '*'));
        this._factories.add(new MessageTemplatesServiceFactory_1.MessageTemplatesServiceFactory());
    }
}
exports.MessageTemplatesLambdaFunction = MessageTemplatesLambdaFunction;
exports.handler = new MessageTemplatesLambdaFunction().getHandler();
//# sourceMappingURL=MessageTemplatesLambdaFunction.js.map