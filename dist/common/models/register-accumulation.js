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
exports.RegisterAccumulation = exports.JRegisterAccumulation = void 0;
const uuid_1 = require("uuid");
const SQL_generator_1 = require("../functions/SQL-generator");
const document_1 = require("./document");
function JRegisterAccumulation(props) {
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
exports.JRegisterAccumulation = JRegisterAccumulation;
class RegisterAccumulation {
    constructor(init) {
        this.id = (0, uuid_1.v1)().toLocaleUpperCase();
        this.parent = null;
        this.kind = true;
        this.calculated = false;
        this.exchangeRate = 1;
        this.type = null;
        this.date = new Date();
        this.document = null;
        this.company = null;
        Object.assign(this, init);
        this.type = this.Prop().type;
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
        const result = {};
        for (const prop of Object.keys(this)) {
            const Prop = this.targetProp(this, prop);
            if (!Prop) {
                continue;
            }
            result[prop] = Prop;
        }
        return result;
    }
    QueryList() { return SQL_generator_1.SQLGenegator.QueryRegisterAccumulatioList(this.Props(), this.type); }
}
__decorate([
    (0, document_1.Props)({ type: 'string', required: true, hidden: true, hiddenInList: true, value: 'newid()' }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "id", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', required: false, hidden: true, hiddenInList: true }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "parent", void 0);
__decorate([
    (0, document_1.Props)({ type: 'boolean', required: true, value: '0' }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "kind", void 0);
__decorate([
    (0, document_1.Props)({ type: 'boolean', required: true, value: '0' }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "calculated", void 0);
__decorate([
    (0, document_1.Props)({ type: 'number', required: true, hidden: true, hiddenInList: true, value: '1' }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "exchangeRate", void 0);
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true, required: true }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "type", void 0);
__decorate([
    (0, document_1.Props)({ type: 'datetime', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "date", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Types.Document', hidden: true, hiddenInList: true, required: true }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "document", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Catalog.Company', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulation.prototype, "company", void 0);
exports.RegisterAccumulation = RegisterAccumulation;
//# sourceMappingURL=register-accumulation.js.map