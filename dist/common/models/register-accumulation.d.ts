import { Ref } from '../types/document-types';
import { PropOptions } from '../interfaces/document';
export interface RegisterAccumulationOptions {
    type: string;
    description: string;
    pruningMethod?: 'balance';
}
export declare function JRegisterAccumulation(props: RegisterAccumulationOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        type: string;
    };
} & T;
export declare class RegisterAccumulation {
    id: string;
    parent: null;
    kind: boolean;
    calculated: boolean;
    exchangeRate: number;
    type: string | null;
    date: Date;
    document: Ref;
    company: Ref;
    constructor(init: Partial<RegisterAccumulation>);
    private targetProp;
    Prop(propertyKey?: string): PropOptions | RegisterAccumulationOptions;
    Props(): {
        [x: string]: any;
    };
    QueryList(): string;
}
