import { type Request, type Response } from "express"
import { STATUS_CODE } from "../constants/http.constants.js";
import ApiResponse from "../utils/response.js";
import redisClient from "../config/redis_client.config.js";
import { ApiError } from "../utils/error.js";

const addProduct = async (req: Request, res: Response) => {
    const { name, descriptions, category, price, variants } = req.body;
    const { id } = req.params as { id: string }
    await redisClient.json.set(id, '$', {
        name,
        category,
        price,
        variants,
        descriptions
    })
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Product added Successfully', STATUS_CODE.SUCCESS))
}

const getProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string }
    const { field } = req.body;
    if (await redisClient.exists(id)) {
        let data;
        if (field) {
            data = await redisClient.json.get(id, {
                path: `$.${field}`
            })
        } else {
            data = await redisClient.json.get(id)
        }
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Product fetch Successfully', STATUS_CODE.SUCCESS, data))
    } else {
        throw new ApiError('Product is not exist', STATUS_CODE.NOT_FOUND)
    }
}


const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { field, value } = req.body;
    const { id } = req.params
    await redisClient.json.set(id as string, `$.${field}`, value)
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Product update Successfully', STATUS_CODE.SUCCESS))
}

const deleteProductField = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as { id: string }
    const { field } = req.body
    if (await redisClient.exists(id)) {
        await redisClient.json.del(id, {
            path: `$.${field}`
        })
        return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Product delete Successfully', STATUS_CODE.SUCCESS))
    } else {
        throw new ApiError('Product is not exist', STATUS_CODE.NOT_FOUND)
    }
}

export default {
    addProduct,
    getProduct,
    deleteProductField,
    updateProduct
}
