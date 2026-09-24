import { type Request, type Response } from "express"
import redis from "../config/redis.config.js"
import { REDIS_BANNER_KEY } from "../constants/redis.constants.js"
import ApiResponse from "../utils/response.js";
import { STATUS_CODE } from "../constants/http.constants.js";
import { ApiError } from "../utils/error.js";

const addRedis = async (req: Request, res: Response): Promise<Response> => {
    const { message } = req.body;
    if (await redis.exists(REDIS_BANNER_KEY)) {
        throw new ApiError('Banner is already added', STATUS_CODE.CONFLIT)
    }
    await redis.set(REDIS_BANNER_KEY, message)
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Banner Added Sucessfully', STATUS_CODE.SUCCESS))
}

const getRedis = async (_req: Request, res: Response): Promise<Response> => {
    if (await redis.exists(REDIS_BANNER_KEY)) {
        const message = await redis.get(REDIS_BANNER_KEY)
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Banner fetch Successfully', STATUS_CODE.SUCCESS, {
            message
        }))
    } else {
        throw new ApiError('Banner is not exist', STATUS_CODE.NOT_FOUND)
    }
}

const deleteRedis = async (_req: Request, res: Response): Promise<Response> => {
    if (await redis.exists(REDIS_BANNER_KEY)) {
        await redis.del(REDIS_BANNER_KEY)
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Banner delete Successfully', STATUS_CODE.SUCCESS))
    } else {
        throw new ApiError('Banner is not exist', STATUS_CODE.NOT_FOUND)
    }
}


export default {
    addRedis,
    getRedis,
    deleteRedis
}