import { PropOptions } from '../interfaces/document';
export declare class SQLGenegator {
    static storedInTablesTypes: {};
    static QueryObject(doc: {
        [x: string]: PropOptions;
    }, type: string): string;
    static QueryObjectFromJSON(schema: {
        [x: string]: any;
    }): string;
    static QueryListHierarchy(doc: {
        [x: string]: any;
    }, type: string): string;
    static QueryList(doc: {
        [x: string]: any;
    }, type: string, storedInTablesTypes?: {
        [x: string]: any;
    }): string;
    static QueryListRaw(doc: {
        [x: string]: any;
    }, type: string): string;
    static QueryRegisterAccumulatioList(doc: {
        [x: string]: any;
    }, type: string): string;
    static QueryRegisterAccumulatioList2(doc: {
        [x: string]: any;
    }, type: string): string;
    static QueryRegisterInfoList(doc: {
        [x: string]: any;
    }, type: string): string;
}
export declare function buildTypesQueryList(select: {
    type: string;
    description: string;
}[]): string;
export declare function buildSubcountQueryList(select: {
    type: string;
    description: string;
}[]): string;
export declare function excludeProps(doc: any): any;
export declare function excludeRegisterAccumulatioProps(doc: any): any;
export declare function excludeRegisterInfoProps(doc: any): any;
