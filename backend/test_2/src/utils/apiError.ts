import { API_STATUS } from "../lib/constants.js";

class ApiError extends Error {
    public status: number;
    public custom: boolean;
    constructor(message: string, status?: number) {
        super(message);
        this.status = typeof status === "number" ? status : API_STATUS.BAD_REQUEST;
        this.custom = true
    }
}

export { ApiError };