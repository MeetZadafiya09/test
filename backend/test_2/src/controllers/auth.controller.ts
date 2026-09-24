import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import ApiResponse from "../helpers/response.helper.js";
import authService from "../services/auth.service.js";
import crypto from "crypto";
import { cookieOptions, csrfCookieOptions } from "../lib/cookie.js";
import { API_STATUS } from "../lib/constants.js";
import { responseMessages } from "../lib/messages.js";

export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.cookie("access_token", result.data.token, cookieOptions);
    res.cookie("csrf_token", crypto.randomUUID(), csrfCookieOptions);
    return res.status(result.status).json(ApiResponse.success(result.message, result.data.data));
});

export const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("csrf_token", csrfCookieOptions);
    return res.status(API_STATUS.SUCCESS).json(ApiResponse.success(responseMessages.AUTH.LOGOUT_SUCCESS));
});