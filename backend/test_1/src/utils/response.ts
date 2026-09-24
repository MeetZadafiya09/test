import { STATUS_CODE, SUCCESS_STATUS_CODE, type StatusCode} from "../constants/http.constants.js"

class ApiResponse {
    message: string
    data: any
    statusCode: StatusCode
    status: boolean
    result: boolean

    constructor(message: string, statusCode: StatusCode, data: any) {
        this.message = message
        this.data = data
        this.statusCode = statusCode
        this.status = SUCCESS_STATUS_CODE.includes(statusCode)
        this.result = this.hasData(data)
    }

    private hasData(data: any): boolean {
        if (data === null || data === undefined || data === '') return false;
        if (Array.isArray(data) && data.length === 0) return false;
        if (typeof data === 'object' && Object.keys(data).length === 0) return false;
        return true;
    }


    static send(message: string = '', statusCode: StatusCode = STATUS_CODE.BAD_REQUEST, data: any = null) {
        return new ApiResponse(message, statusCode, data)
    }
}

export default ApiResponse;