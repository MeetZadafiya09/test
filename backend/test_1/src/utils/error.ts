import { type StatusCode } from "../constants/http.constants.js";

class ApiError extends Error {
    public status: number;
    public custom: boolean;
    constructor(message: string, status: StatusCode) {
        super(message);
        this.status = status;
        this.custom = true
    }
}

export { ApiError };

export type ApiErrorType = InstanceType<typeof ApiError>