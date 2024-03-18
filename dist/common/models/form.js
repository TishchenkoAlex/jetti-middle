"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInnerSimpleTypeByObject = exports.FormBase = exports.DynamicProps = exports.JForm = void 0;
const uuid_1 = require("uuid");
const document_1 = require("./document");
function JForm(props) {
    return function classDecorator(constructor) {
        Reflect.defineMetadata(document_1.symbolProps, props, constructor);
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.type = props.type;
            }
        };
    };
}
exports.JForm = JForm;
class DynamicProps {
    constructor() {
        this.Kind = '';
        this.Table = '';
        this.Filed = '';
        this.Options = '';
        this.OptionsValue = '';
        this.SetId = '';
    }
}
__decorate([
    (0, document_1.Props)({ type: 'enum', value: ['add', 'mod', 'del'] }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "Kind", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string' }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "Table", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string' }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "Filed", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string' }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "Options", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string' }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "OptionsValue", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string' }),
    __metadata("design:type", Object)
], DynamicProps.prototype, "SetId", void 0);
exports.DynamicProps = DynamicProps;
class FormBase {
    constructor(user) {
        this.id = (0, uuid_1.v1)().toLocaleUpperCase();
        this.date = new Date();
        this.code = '';
        this.description = '';
        this.company = null;
        this.posted = false;
        this.deleted = false;
        this.parent = null;
        this.isfolder = false;
        this.info = '';
        this.timestamp = null;
        this.dynamicProps = [new DynamicProps];
        if (!user)
            this.user = { email: '', description: '', env: {}, isAdmin: false, roles: [] };
        else
            this.user = user;
    }
    targetProp(target, propertyKey) {
        const result = Reflect.getMetadata(document_1.symbolProps, target, propertyKey);
        return result;
    }
    Prop(propertyKey = 'this') {
        if (propertyKey === 'this') {
            return Reflect.getMetadata(document_1.symbolProps, this.constructor);
        }
        else {
            return Reflect.getMetadata(document_1.symbolProps, this.constructor.prototype, propertyKey);
        }
    }
    Props() {
        const proto = new this.constructor.prototype.constructor;
        const p = this.Prop();
        const result = {};
        for (const prop of Object.keys(proto)) {
            const Prop = proto.targetProp(this, prop);
            if (!Prop) {
                continue;
            }
            result[prop] = Object.assign({}, Prop);
            const metadata = proto.Prop();
            for (const el in result[prop]) {
                if (typeof result[prop][el] === 'function')
                    result[prop][el] = result[prop][el].toString();
            }
            const value = proto[prop];
            if (Array.isArray(value) && value.length) {
                const arrayProp = {};
                for (const arrProp of Object.keys(value[0])) {
                    const PropArr = proto.targetProp(value[0], arrProp);
                    if (!PropArr) {
                        continue;
                    }
                    arrayProp[arrProp] = Object.assign({}, PropArr);
                    for (const el in arrayProp[arrProp]) {
                        if (typeof arrayProp[arrProp][el] === 'function')
                            arrayProp[arrProp][el] = arrayProp[arrProp][el].toString();
                    }
                }
                result[prop][prop] = arrayProp;
            }
        }
        this.DynamicPropsAdd(result);
        this.DynamicPropsMod(result);
        this.DynamicPropsDel(result);
        this.Props = () => result;
        return result;
    }
    DynamicPropsAdd(props) {
        // add tables
        const addTable = this.dynamicProps.filter(e => e.Kind === 'add' && e.Table);
        const tables = [...new Set(addTable.map(e => e.Table))];
        for (const tableName of tables) {
            const tableProps = addTable.filter(e => e.Table === tableName && !e.Filed);
            const tableOb = { type: 'table' };
            tableOb[tableName] = {};
            for (const tableProp of tableProps) {
                tableOb[tableProp.Options] = JSON.parse(tableProp.OptionsValue);
            }
            const tableFiledsProps = addTable.filter(e => e.Table === tableName && e.Filed);
            const tableFileds = [...new Set(tableFiledsProps.map(e => e.Filed))];
            for (const tableFiledName of tableFileds) {
                const tableFiledProps = addTable.filter(e => e.Table === tableName && e.Filed === tableFiledName);
                const tableFieldOb = {};
                for (const tableFiledProp of tableFiledProps) {
                    tableFieldOb[tableFiledProp.Options] = JSON.parse(tableFiledProp.OptionsValue);
                }
                tableOb[tableName][tableFiledName] = tableFieldOb;
            }
            props[tableName] = tableOb;
            if (!Object.keys(this).includes(tableName))
                this[tableName] = [];
        }
        // add fields
        const addfileds = this.dynamicProps.filter(e => e.Kind === 'add' && !e.Table);
        const fields = [...new Set(addfileds.map(e => e.Filed))];
        for (const fieldName of fields) {
            const filedProps = addfileds.filter(e => e.Filed === fieldName);
            const fieldOb = {};
            for (const filedProp of filedProps) {
                fieldOb[filedProp.Options] = JSON.parse(filedProp.OptionsValue);
            }
            props[fieldName] = fieldOb;
            if (!Object.keys(this).includes(fieldName))
                this[fieldName] = null;
        }
    }
    DynamicPropsMod(props) {
        // mod tables
        const dynamicTables = this.dynamicProps.filter(e => e.Kind === 'mod' && e.Table);
        const tables = [...new Set(dynamicTables.map(e => e.Table))];
        for (const tableName of tables) {
            const tableProps = dynamicTables.filter(e => e.Table === tableName && !e.Filed);
            const tableOb = props[tableName];
            for (const tableProp of tableProps) {
                tableOb[tableProp.Options] = JSON.parse(tableProp.OptionsValue);
            }
            const tableFiledsProps = dynamicTables.filter(e => e.Table === tableName && e.Filed);
            const tableFileds = [...new Set(tableFiledsProps.map(e => e.Filed))];
            for (const tableFiledName of tableFileds) {
                const tableFiledProps = dynamicTables.filter(e => e.Table === tableName && e.Filed === tableFiledName);
                const tableFieldOb = tableOb[tableName][tableFiledName];
                for (const tableFiledProp of tableFiledProps) {
                    tableFieldOb[tableFiledProp.Options] = JSON.parse(tableFiledProp.OptionsValue);
                }
                tableOb[tableName][tableFiledName] = tableFieldOb;
            }
            props[tableName] = tableOb;
        }
        // mod fields
        const dynamicFileds = this.dynamicProps.filter(e => e.Kind === 'mod' && !e.Table);
        const fields = [...new Set(dynamicFileds.map(e => e.Filed))];
        for (const fieldName of fields) {
            const filedProps = dynamicFileds.filter(e => e.Filed === fieldName);
            const fieldOb = props[fieldName];
            for (const filedProp of filedProps) {
                fieldOb[filedProp.Options] = JSON.parse(filedProp.OptionsValue);
            }
            props[fieldName] = fieldOb;
        }
    }
    DynamicPropsDel(props) {
        const dynamicTables = this.dynamicProps.filter(e => e.Kind === 'del' && e.Table);
        const tables = [...new Set(dynamicTables.map(e => e.Table))];
        for (const tableName of tables) {
            const tableProps = dynamicTables.filter(e => e.Table === tableName && !e.Filed);
            if (tableProps.length) {
                delete props[tableName];
                continue;
            } // del tables
            const tableFiledsProps = dynamicTables.filter(e => e.Table === tableName && e.Filed);
            const tableFileds = [...new Set(tableFiledsProps.map(e => e.Filed))];
            for (const tableFiledName of tableFileds) {
                delete props[tableName][tableName][tableFiledName]; // del tableы columns
            }
        }
        // del fields
        const dynamicFileds = this.dynamicProps.filter(e => e.Kind === 'del' && !e.Table);
        const fields = [...new Set(dynamicFileds.map(e => e.Filed))];
        for (const fieldName of fields) {
            {
                delete props[fieldName];
                continue;
            }
        }
    }
    DynamicPropsPush(kind, options, optionsValue, filed = '', table = '', setId = '') {
        this.dynamicProps.push({
            Kind: kind, Table: table, Filed: filed, Options: options.toString(), OptionsValue: JSON.stringify(optionsValue), SetId: setId
        });
    }
    DynamicPropsClearSet(setId) {
        this.dynamicProps = this.dynamicProps.filter(e => e.SetId !== setId);
    }
    DynamicPropsAddForObject(object, propName, setId) {
        if (object instanceof Array) {
            this.DynamicPropsAddForArray(object, propName, setId);
        }
    }
    DynamicPropsAddForArray(object, propName, setId) {
        if (!object.length)
            return;
        Object.keys(object[0]).forEach(key => {
            this.DynamicPropsPush('add', 'type', getInnerSimpleTypeByObject(object[0][key]), key, propName, setId);
        });
    }
}
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "user", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "id", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true }),
    __metadata("design:type", String)
], FormBase.prototype, "type", void 0);
__decorate([
    (0, document_1.Props)({ type: 'datetime', order: 1, hidden: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "date", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, order: 2, style: { width: '135px' } }),
    __metadata("design:type", Object)
], FormBase.prototype, "code", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', order: 3, hidden: true, style: { width: '300px' } }),
    __metadata("design:type", Object)
], FormBase.prototype, "description", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Catalog.Company', order: 4, hidden: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "company", void 0);
__decorate([
    (0, document_1.Props)({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "posted", void 0);
__decorate([
    (0, document_1.Props)({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "deleted", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Types.Subcount', hidden: true, hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], FormBase.prototype, "parent", void 0);
__decorate([
    (0, document_1.Props)({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "isfolder", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true, order: -1, controlType: 'textarea' }),
    __metadata("design:type", Object)
], FormBase.prototype, "info", void 0);
__decorate([
    (0, document_1.Props)({ type: 'datetime', hiddenInList: true, order: -1, hidden: true }),
    __metadata("design:type", Object)
], FormBase.prototype, "timestamp", void 0);
__decorate([
    (0, document_1.Props)({
        type: 'table', required: false, label: 'Dynamic props', order: 77
    }),
    __metadata("design:type", Array)
], FormBase.prototype, "dynamicProps", void 0);
exports.FormBase = FormBase;
function getInnerSimpleTypeByObject(obj) {
    const type = typeof obj;
    if (type !== 'object')
        return type;
    if (obj instanceof Date)
        return 'datetime';
    if (obj instanceof Array)
        return 'array';
    return 'string';
}
exports.getInnerSimpleTypeByObject = getInnerSimpleTypeByObject;
//# sourceMappingURL=form.js.map