import { FormListSettings } from '../classes/form-list';
import { Ref, StorageType } from '../types/document-types';
import { PrimitiveTypes } from '../types/primitive-types';
import { ColumnDef } from './column';

export interface IViewModel {
    schema: { [x: string]: any };
    columnsDef: ColumnDef[];
    metadata: DocumentOptions;
    settings: FormListSettings;
    model: { [x: string]: any };
}

export interface Relation {
    name: string;
    type: string;
    field: string;
}

export interface CopyTo {
    type: string;
    label: string;
    Operation?: Ref;
    icon: string;
    order: number;
}

export interface Command {
    method: string;
    label: string;
    icon: string;
    order: number;
    clientModule?: string;
    isClientCommand?: boolean;
}


export interface INoSqlDocument {
    id: Ref;
    date: Date;
    type: string;
    code: string;
    description: string;
    company: Ref;
    user: Ref;
    posted: boolean;
    deleted: boolean;
    isfolder: boolean;
    parent: Ref;
    info: string;
    timestamp: Date;
    ExchangeCode?: string;
    ExchangeBase?: string;
    doc: { [x: string]: any };
    docByKeys?: { key: string, value: any }[];
}

export interface OwnerRef {
    dependsOn: string;
    filterBy: string;
    isOwnerFixed?: boolean;
}

export interface DocumentOptions {
    type: string;
    description: string;
    icon: string;
    menu: string;
    dimensions?: { [x: string]: string }[];
    prefix?: string;
    commands?: Command[];
    presentation?: 'code' | 'description';
    hierarchy?: StorageType;
    copyTo?: CopyTo[];
    relations?: Relation[];
    module?: string;
    storedIn?: 'table' | 'view'
}

export interface PropOptions {
    type: string;
    controlType?: PrimitiveTypes;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    hidden?: boolean;
    hiddenInList?: boolean;
    hiddenInForm?: boolean;
    order?: number;
    style?: { [x: string]: any };
    owner?: OwnerRef[] | null;
    totals?: number;
    change?: boolean;
    onChange?: Function;
    onChangeServer?: boolean;
    value?: any;
    unique?: boolean;
    dimension?: boolean;
    resource?: boolean;
    isAdditional?: boolean;
    storageType?: StorageType;
    useIn?: StorageType;
    isIndexed?: boolean;
    isProtected?: boolean;
    isUnique?: boolean;
    isNotCopy?: boolean;
    panel?: string;
    fieldset?: string;
    validators?: { key: string, value?: any }[];
    balanceCalculationFormula?: string;
}

export interface IFlatDocument {
    id: Ref;
    date: Date;
    type: string;
    code: string;
    description: string;
    company: Ref;
    user: Ref;
    posted: boolean;
    deleted: boolean;
    isfolder: boolean;
    parent: Ref;
    info: string;
    timestamp: Date | null;
    ExchangeCode?: string;
    ExchangeBase?: string;
}
