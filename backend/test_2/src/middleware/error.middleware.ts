import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../helpers/response.helper.js';
import { checkValidationErrors } from '../helpers/error.helper.js';


export const globalErrorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const error = checkValidationErrors(err);
    return res.status(error.status).json(ApiResponse.badRequest(error.message));
}