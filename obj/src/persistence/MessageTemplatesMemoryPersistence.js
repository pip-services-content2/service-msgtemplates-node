"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplatesMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class MessageTemplatesMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchMultilanguageString(value, search) {
        for (let prop in value) {
            if (value.hasOwnProperty(prop)) {
                let text = '' + value[prop];
                if (this.matchString(text, search))
                    return true;
            }
        }
        return false;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchMultilanguageString(item.subject, search))
            return true;
        if (this.matchMultilanguageString(item.text, search))
            return true;
        if (this.matchMultilanguageString(item.html, search))
            return true;
        if (this.matchString(item.status, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let status = filter.getAsNullableString('status');
        let name = filter.getAsNullableString('name');
        return (item) => {
            if (id && item.id != id)
                return false;
            if (name && item.name != name)
                return false;
            if (status && item.status != status)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    getOneByIdOrName(correlationId, idOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((item) => item.id == idOrName || item.name == idOrName);
            if (item != null) {
                this._logger.trace(correlationId, "Found item by %s", idOrName);
                return item;
            }
            else {
                this._logger.trace(correlationId, "Found item by %s", idOrName);
                throw new pip_services3_commons_nodex_2.NotFoundException(correlationId, 'TEMPLATE_NOT_FOUND', 'Message template ' + idOrName + ' was not found').withDetails('id_or_name', idOrName);
            }
        });
    }
}
exports.MessageTemplatesMemoryPersistence = MessageTemplatesMemoryPersistence;
//# sourceMappingURL=MessageTemplatesMemoryPersistence.js.map