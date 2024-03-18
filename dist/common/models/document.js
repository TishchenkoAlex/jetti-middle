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
exports.DocumentBase = exports.JDocument = exports.Props = exports.symbolProps = void 0;
require("reflect-metadata");
const uuid_1 = require("uuid");
const type_1 = require("../helpers/type");
exports.symbolProps = Symbol('Props');
function Props(props) {
    return Reflect.metadata(exports.symbolProps, props);
}
exports.Props = Props;
function JDocument(props) {
    return function classDecorator(constructor) {
        Reflect.defineMetadata(exports.symbolProps, props, constructor);
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.type = props.type;
            }
        };
    };
}
exports.JDocument = JDocument;
class DocumentBase {
    constructor() {
        this.id = (0, uuid_1.v1)().toLocaleUpperCase();
        this.date = new Date();
        this.code = '';
        this.description = '';
        this.company = null;
        this.user = null;
        this.posted = false;
        this.deleted = false;
        this.parent = null;
        this.isfolder = false;
        this.info = '';
        this.timestamp = null;
        this.workflow = null;
    }
    targetProp(target, propertyKey) {
        const result = Reflect.getMetadata(exports.symbolProps, target, propertyKey);
        return result;
    }
    Prop(propertyKey = 'this') {
        if (propertyKey === 'this') {
            return Reflect.getMetadata(exports.symbolProps, this.constructor);
        }
        else {
            return Reflect.getMetadata(exports.symbolProps, this.constructor.prototype, propertyKey);
        }
    }
    get isDoc() { return type_1.Type.isDocument(this.type); }
    get isCatalog() { return type_1.Type.isCatalog(this.type); }
    get isType() { return type_1.Type.isType(this.type); }
    get isJornal() { return type_1.Type.isJournal(this.type); }
    Props() {
        const proto = new this.constructor.prototype.constructor;
        this.targetProp(proto, 'description').hidden = proto.isDoc;
        this.targetProp(proto, 'date').hidden = proto.isCatalog;
        this.targetProp(proto, 'date').required = proto.isDoc;
        const p = this.Prop();
        if (p && p.hierarchy === 'folders')
            this.targetProp(proto, 'parent').storageType = 'folders';
        else if (p && p.hierarchy === 'elements')
            this.targetProp(proto, 'parent').storageType = 'elements';
        else if (p && p.hierarchy === 'all')
            this.targetProp(proto, 'parent').storageType = 'all';
        else
            this.targetProp(proto, 'parent').storageType = 'elements';
        const result = {};
        // const commonProps = `id,type,date,code,description,company,user,posted,deleted,parent,isfolder,info,timestamp`.split(',');
        const commonProps = Object.keys(new DocumentBase);
        commonProps.push('type');
        for (const prop of Object.keys(proto)) {
            const Prop = proto.targetProp(this, prop);
            if (!Prop ||
                (commonProps.indexOf(prop) === -1 && ((Prop.useIn === 'folders' && !this.isfolder) ||
                    ((Prop.useIn === 'elements' || !Prop.useIn) && this.isfolder)))) {
                continue;
            }
            result[prop] = Object.assign({}, Prop);
            const metadata = proto.Prop();
            if (metadata && metadata.hierarchy === undefined)
                metadata.hierarchy = 'elements';
            if (prop === 'code') {
                if (metadata && metadata.prefix) {
                    result[prop].label = (Prop.label || prop) + ' (auto)';
                    result[prop].required = false;
                }
            }
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
        if (this.isDoc)
            result['company'].required = true;
        this.Props = () => result;
        return result;
    }
    map(doc) {
        if (doc)
            Object.assign(this, doc);
    }
    getPropsWithOption(propOptions, propsValue) {
        const props = this.Props();
        const res = {};
        Object.keys(props)
            .filter(propsName => Object.keys(props[propsName])
            .find(propOpt => propOpt === propOptions && props[propsName][propOpt] === propsValue))
            .forEach(propsName => res[propsName] = props[propsName]);
        return res;
    }
}
__decorate([
    Props({ type: 'string', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "id", void 0);
__decorate([
    Props({ type: 'string', hidden: true, hiddenInList: true }),
    __metadata("design:type", String)
], DocumentBase.prototype, "type", void 0);
__decorate([
    Props({ type: 'datetime', order: 1 }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "date", void 0);
__decorate([
    Props({ type: 'string', required: true, order: 2, style: { width: '135px' } }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "code", void 0);
__decorate([
    Props({ type: 'string', order: 3, required: true, style: { width: '300px' } }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "description", void 0);
__decorate([
    Props({ type: 'Catalog.Company', required: false, order: 4, style: { width: '250px' } }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "company", void 0);
__decorate([
    Props({ type: 'Catalog.User', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "user", void 0);
__decorate([
    Props({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "posted", void 0);
__decorate([
    Props({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "deleted", void 0);
__decorate([
    Props({ type: 'Types.Subcount', hidden: true, hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "parent", void 0);
__decorate([
    Props({ type: 'boolean', hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "isfolder", void 0);
__decorate([
    Props({ type: 'string', hiddenInList: true, order: -1, controlType: 'textarea' }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "info", void 0);
__decorate([
    Props({ type: 'datetime', hiddenInList: true, order: -1, hidden: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "timestamp", void 0);
__decorate([
    Props({ type: 'Document.WorkFlow', hiddenInList: true, order: -1, hidden: true }),
    __metadata("design:type", Object)
], DocumentBase.prototype, "workflow", void 0);
exports.DocumentBase = DocumentBase;
//# sourceMappingURL=document.js.map