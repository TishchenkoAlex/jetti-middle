import { IUserPermission } from "./common";
export interface IJWTPayload {
    email: string;
    description: string;
    isAdmin: boolean;
    roles: any[];
    env: {
        [x: string]: any;
    };
    timezoneOffset?: number;
}
export interface IAccount extends IJWTPayload {
    created: string;
    password: string;
    status: string;
}
export interface ILoginResponse {
    account: IAccount | undefined;
    token: string;
    photo?: any;
    permissions?: IUserPermission[];
}
