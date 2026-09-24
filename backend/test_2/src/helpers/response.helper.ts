import { STATUS_CODE, StatusCode } from '../lib/constants.js';


class ApiResponse {
    message: string;
    data: any;
    statusCode: StatusCode;
    success: boolean;
    result: boolean;

    constructor(message: string, data: any, statusCode: StatusCode, success: boolean) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.success = success;
        this.result = this.hasData(data);
    }

    private hasData(data: any): boolean {
        if (data === null || data === undefined || data === '') return false;
        if (Array.isArray(data) && data.length === 0) return false;
        if (typeof data === 'object' && Object.keys(data).length === 0) return false;
        return true;
    }

    static success(message: string, data: any = null, statusCode: StatusCode = STATUS_CODE.SUCCESS, success: boolean = true) {
        return new ApiResponse(message, data, statusCode, success);
    }

    static badRequest(message: string, data: any = null, statusCode: StatusCode = STATUS_CODE.FAILED, success: boolean = false) {
        return new ApiResponse(message, data, statusCode, success);
    }

    static notFound(message: string, data: any = null, statusCode: StatusCode = STATUS_CODE.FAILED, success: boolean = false) {
        return new ApiResponse(message, data, statusCode, success)
    }
}

export default ApiResponse;