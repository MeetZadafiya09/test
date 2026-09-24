import { type NextFunction, type Request, type Response } from 'express'
import type { ApiErrorType } from '../utils/error.js'
import { STATUS_CODE } from '../constants/http.constants.js'

const errorMiddleware = async (err: ApiErrorType, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err)
    return res.status(err?.status ? err.status : STATUS_CODE.BAD_REQUEST).json({
        message: err.message
    })
}

export { errorMiddleware }