import { type Request, type Response } from "express"
import redis from "../config/redis.config.js";
import { STATUS_CODE } from "../constants/http.constants.js";
import ApiResponse from "../utils/response.js";
import { ApiError } from "../utils/error.js";


const addEmails = async (req: Request, res: Response): Promise<Response> => {
    const { to, body, subject } = req.body;
    const job = {
        to,
        body,
        subject,
        createAt: new Date().toISOString()
    }
    await redis.lpush('queue:emails', JSON.stringify(job))
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Emails Added Successfully', STATUS_CODE.SUCCESS))
}

const receiveEmail = async (_req: Request, res: Response): Promise<Response> => {
    const rawData = await redis.rpop('queue:emails')
    if (rawData) {
        const data = JSON.parse(rawData)
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Emails Added Successfully', STATUS_CODE.SUCCESS, data))
    } else {
        throw new ApiError('Email Queue is empty', STATUS_CODE.NOT_FOUND)
    }
}

export default {
    addEmails,
    receiveEmail
}

