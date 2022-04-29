import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { MessageTemplateV1Schema } from '../data/version1/MessageTemplateV1Schema';
import { IMessageTemplatesController } from './IMessageTemplatesController';

export class MessageTemplatesCommandSet extends CommandSet {
    private _logic: IMessageTemplatesController;

    constructor(logic: IMessageTemplatesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetMessageTemplatesCommand());
		this.addCommand(this.makeGetMessageTemplateByIdCommand());
		this.addCommand(this.makeGetMessageTemplateByIdOrNameCommand());
		this.addCommand(this.makeCreateMessageTemplateCommand());
		this.addCommand(this.makeUpdateMessageTemplateCommand());
		this.addCommand(this.makeDeleteMessageTemplateByIdCommand());
    }

	private makeGetMessageTemplatesCommand(): ICommand {
		return new Command(
			"get_templates",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getTemplates(correlationId, filter, paging);
            }
		);
	}

	private makeGetMessageTemplateByIdCommand(): ICommand {
		return new Command(
			"get_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let id = args.getAsString("template_id");
				return await this._logic.getTemplateById(correlationId, id);
            }
		);
	}

	private makeGetMessageTemplateByIdOrNameCommand(): ICommand {
		return new Command(
			"get_template_by_id_or_name",
			new ObjectSchema(true)
				.withRequiredProperty('id_or_name', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let idOrName = args.getAsString("id_or_name");
				return await this._logic.getTemplateByIdOrName(correlationId, idOrName);
            }
		);
	}

	private makeCreateMessageTemplateCommand(): ICommand {
		return new Command(
			"create_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new MessageTemplateV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let template = args.get("template");
				return await this._logic.createTemplate(correlationId, template);
            }
		);
	}

	private makeUpdateMessageTemplateCommand(): ICommand {
		return new Command(
			"update_template",
			new ObjectSchema(true)
				.withRequiredProperty('template', new MessageTemplateV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let template = args.get("template");
				return await this._logic.updateTemplate(correlationId, template);
            }
		);
	}
	
	private makeDeleteMessageTemplateByIdCommand(): ICommand {
		return new Command(
			"delete_template_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('template_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let id = args.getAsNullableString("template_id");
                return await this._logic.deleteTemplateById(correlationId, id);
			}
		);
	}

}