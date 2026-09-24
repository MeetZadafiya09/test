
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../helpers/response.helper.js";
import { formatValidationError } from "../helpers/error.helper.js";
import { validationMessages } from "../lib/messages.js";
import asyncHandler from "express-async-handler";

type ValidationData = {
    body?: Record<string, any>;
    query?: Record<string, any>;
    params?: Record<string, any>;
};

const validate = (schema: any) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const data: ValidationData = {};
        if (req.body && Object.keys(req.body).length > 0) data.body = req.body;
        if (req.query && Object.keys(req.query).length > 0) data.query = req.query;
        if (req.params && Object.keys(req.params).length > 0) data.params = req.params;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json(ApiResponse.badRequest(validationMessages.COMMON.DATA_REQUIRED));
        } else {
            const { error } = schema.validate(data,{
                allowUnknown: false
            });
            if (error) {
                const err = formatValidationError(error);
                return res.status(err.status).json(ApiResponse.badRequest(err.message));
            }else{
                next();
            }
        }
    })
}

export default validate;