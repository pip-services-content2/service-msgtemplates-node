const services = require('../../../../src/protos/msgtemplates_v1_grpc_pb');
const messages = require('../../../../src/protos/msgtemplates_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IMessageTemplatesController } from '../../logic/IMessageTemplatesController';
import { MessageTemplatesGrpcConverterV1 } from './MessageTemplatesGrpcConverterV1';

export class MessageTemplatesGrpcServiceV1 extends GrpcService {
    private _controller: IMessageTemplatesController;
	
    public constructor() {
        super(services.MessageTemplatesService);
        this._dependencyResolver.put('controller', new Descriptor("service-msgtemplates", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IMessageTemplatesController>('controller');
    }
    
    private async getTemplates(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        MessageTemplatesGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = MessageTemplatesGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.MessageTemplatePageReply();
        try {
            let result = await this._controller.getTemplates(correlationId, filter, paging);
            let page = MessageTemplatesGrpcConverterV1.fromMessageTemplatePage(result);
            response.setPage(page);
        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getTemplateById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();

        let response = new messages.MessageTemplateObjectReply();
        try {
            let result = await this._controller.getTemplateById(correlationId, templateId);
            let template = MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
            response.setTemplate(template);

        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getTemplateByIdOrName(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let idOrName = call.request.getName();

        let response = new messages.MessageTemplateObjectReply();
        try {
            let result = await this._controller.getTemplateByIdOrName(correlationId, idOrName);
            let template = MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
            if (result)
                response.setTemplate(template);
        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }
    
    private async createTemplate(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());

        let response = new messages.MessageTemplateObjectReply();
        try {
            let result = await this._controller.createTemplate(correlationId, template);
            let grpcTemplateObj = MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
            if (result)
                response.setTemplate(grpcTemplateObj);
        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async updateTemplate(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let template = MessageTemplatesGrpcConverterV1.toMessageTemplate(call.request.getTemplate());

        let response = new messages.MessageTemplateObjectReply();
        try {
            let result = await this._controller.updateTemplate(correlationId, template);
            let grpcTemplateObj = MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
            if (result)
                response.setTemplate(grpcTemplateObj);
        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async deleteTemplateById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let templateId = call.request.getTemplateId();

        let response = new messages.MessageTemplateObjectReply();
        try {
            let result = await this._controller.deleteTemplateById(correlationId, templateId);
            let grpcTemplateObj = MessageTemplatesGrpcConverterV1.fromMessageTemplate(result);
            if (result)
                response.setTemplate(grpcTemplateObj);
        } catch (err) {
            let error = MessageTemplatesGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    public register() {
        this.registerMethod(
            'get_templates', 
            null,
            this.getTemplates
        );

        this.registerMethod(
            'get_template_by_id', 
            null,
            this.getTemplateById
        );

        this.registerMethod(
            'get_template_by_id_or_name', 
            null,
            this.getTemplateByIdOrName
        );

        this.registerMethod(
            'create_template', 
            null,
            this.createTemplate
        );

        this.registerMethod(
            'update_template', 
            null,
            this.updateTemplate
        );

        this.registerMethod(
            'delete_template_by_id',
            null, 
            this.deleteTemplateById
        );
    }
}
