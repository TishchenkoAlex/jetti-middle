import { Ref } from '../types/document-types';
import { PropOptions } from '../interfaces/document';
export interface RegisterInfoOptions {
    type: string;
    description: string;
    pruningMethod?: 'sliceLast' | 'sliceFirst';
}
export declare function JRegisterInfo(props: RegisterInfoOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        type: string;
    };
} & T;
export declare class RegisterInfo {
    type: string | null;
    date: Date;
    company: Ref;
    document: Ref;
    constructor(init: Partial<RegisterInfo>);
    private targetProp;
    Prop(propertyKey?: string): PropOptions | RegisterInfoOptions;
    Props(): {
        [x: string]: PropOptions;
    };
    QueryList(): string;
}
