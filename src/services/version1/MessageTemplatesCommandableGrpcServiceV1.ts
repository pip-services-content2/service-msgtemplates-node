import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class MessageTemplatesCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/message_templates');
        this._dependencyResolver.put('controller', new Descriptor('service-msgtemplates', 'controller', 'default', '*', '1.0'));
    }
}