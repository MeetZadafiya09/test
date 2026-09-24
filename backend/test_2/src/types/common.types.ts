
import { StatusCode } from "../lib/constants.js";

export interface ServiceResponse {
    message: string;
    status: number;
    data?: any;
    statusCode?: StatusCode;
}


export type Source = 'body' | 'params' | 'query';