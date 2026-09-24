import { type Request, type Response } from "express"
import redis from "../config/redis.config.js"
import ApiResponse from "../utils/response.js";
import { STATUS_CODE } from "../constants/http.constants.js";
import { ApiError } from "../utils/error.js";

const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { first_name, last_name, email, prefer_cities, location } = req.body;
    const { id } = req.params
    await redis.hset(id as string, {
        first_name,
        last_name,
        email,
        prefer_cities,
        location
    })
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('User added Successfully', STATUS_CODE.SUCCESS))
}

const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string }
    if (await redis.exists(id)) {
        const data = await redis.hgetall(id)
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('User fetch Successfully', STATUS_CODE.SUCCESS, data))
    } else {
        throw new ApiError('User is not exist', STATUS_CODE.NOT_FOUND)
    }
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { prefer_cities } = req.body;
    const { id } = req.params
    await redis.hset(id as string, 'prefer_cities', prefer_cities)
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('User update Successfully', STATUS_CODE.SUCCESS))
}

const deleteUserField = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string }
    const { field } = req.body
    if (await redis.exists(id)) {
        await redis.hdel(id, field)
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('User delete Successfully', STATUS_CODE.SUCCESS))
    } else {
        throw new ApiError('User is not exist', STATUS_CODE.NOT_FOUND)
    }
}

export default {
    addUser,
    getUser,
    updateUser,
    deleteUserField
}