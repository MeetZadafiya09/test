import { type Request, type Response } from 'express'
import redis from '../config/redis.config.js';
import { randomInt } from 'node:crypto'
import { STATUS_CODE } from '../constants/http.constants.js';
import ApiResponse from '../utils/response.js';

const sendOTP = async (req: Request, res: Response) => {
    const { phone } = req.body;
    const otp = randomInt(100000, 999999)
    await redis.set(`otp:${phone}`, otp.toString(), 'EX', 30)
    res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('OTP Sent Successfully', STATUS_CODE.SUCCESS))
}

export default {
    sendOTP
}