import { FormListOrder, FormListFilter } from '../classes/form-list';
import { OwnerRef } from './document';
export interface ColumnDef {
    field: string;
    type: string;
    label: string;
    hidden: boolean;
    order: number;
    style: string | {
        [key: string]: any;
    };
    headerStyle: string | {
        [key: string]: any;
    };
    required: boolean;
    readOnly: boolean;
    owner?: OwnerRef[];
    totals?: number;
    onChange?: Function;
    onChangeServer?: boolean;
    sort?: FormListOrder;
    filter?: FormListFilter;
    value: any;
    control?: any;
    anyTemp?: any;
}
