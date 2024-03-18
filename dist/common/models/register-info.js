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
exports.RegisterInfo = exports.JRegisterInfo = void 0;
const SQL_generator_1 = require("../functions/SQL-generator");
const document_1 = require("./document");
function JRegisterInfo(props) {
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
exports.JRegisterInfo = JRegisterInfo;
class RegisterInfo {
    constructor(init) {
        this.type = null;
        this.company = null;
        this.document = null;
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
    QueryList() { return SQL_generator_1.SQLGenegator.QueryRegisterInfoList(this.Props(), this.type); }
}
__decorate([
    (0, document_1.Props)({ type: 'string', hidden: true, hiddenInList: true, required: true }),
    __metadata("design:type", Object)
], RegisterInfo.prototype, "type", void 0);
__decorate([
    (0, document_1.Props)({ type: 'datetime', required: true }),
    __metadata("design:type", Date)
], RegisterInfo.prototype, "date", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Catalog.Company', required: true }),
    __metadata("design:type", Object)
], RegisterInfo.prototype, "company", void 0);
__decorate([
    (0, document_1.Props)({ type: 'Types.Document', hiddenInList: true, required: true }),
    __metadata("design:type", Object)
], RegisterInfo.prototype, "document", void 0);
exports.RegisterInfo = RegisterInfo;
//# sourceMappingURL=register-info.js.map