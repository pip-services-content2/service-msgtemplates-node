import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class MessageTemplatesGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getTemplates;
    private getTemplateById;
    private getTemplateByIdOrName;
    private createTemplate;
    private updateTemplate;
    private deleteTemplateById;
    register(): void;
}
