import { PUBLIC_KEY } from "../app.config.js";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { responseMessages } from "../lib/messages.js";
import { API_STATUS, USER_STATUS, PLATFORM } from "../lib/constants.js";
import { importSPKI, jwtVerify } from "jose";
import userRepository from "../repositories/user.repository.js";

interface AuthConfig {
    guest?: boolean;
}

const checkAuth = ({ guest = false }: AuthConfig = {}) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string;
        const platform = req.headers["x-platform"] || PLATFORM.WEB;
        req.headers['x-platform'] = platform;
        if ((req.cookies && req.cookies.csrf_token) || (platform === PLATFORM.APP && req.headers["x-access-token"])) {
            const cookieToken = req.cookies.csrf_token;
            const headerToken = req.headers["x-csrf-token"];
            if ((cookieToken === headerToken) || (platform === PLATFORM.APP)) {
                if (req.cookies.access_token || (platform === PLATFORM.APP && req.headers["x-access-token"])) {
                    token = req.cookies.access_token || req.headers["x-access-token"];
                    const publicKey = await importSPKI(PUBLIC_KEY as string, 'ES256');
                    const { payload } = await jwtVerify(token, publicKey);
                    if (payload.exp && payload.exp * 1000 > Date.now()) {
                        const user = await userRepository.findById(payload.id as string);
                        if (user) {
                            if (user.status === USER_STATUS.BLOCKED) {
                                return next(new ApiError(responseMessages.AUTH.USER_BLOCKED, API_STATUS.UNAUTHORIZED));
                            } else {
                                req.app_user = {
                                    id: user.d,
                                    name: `${user.first_name} ${user.last_name}`,
                                    is_email_verified: user.is_email_verified
                                };
                                next();
                            }
                        } else {
                            return next(new ApiError(responseMessages.AUTH.UNAUTHORIZED, API_STATUS.UNAUTHORIZED));
                        }
                    } else {
                        return next(new ApiError(responseMessages.AUTH.ACCESS_TOKEN_EXPIRED, API_STATUS.UNAUTHORIZED));
                    }
                } else {
                    if (guest) {
                        next();
                    } else {
                        return next(new ApiError(responseMessages.AUTH.INVALID_ACCESS_TOKEN, API_STATUS.UNAUTHORIZED));
                    }
                }
            } else {
                if (guest) {
                    next();
                } else {
                    return next(new ApiError(responseMessages.AUTH.INVALID_CSRF_TOKEN, API_STATUS.UNAUTHORIZED));
                }
            }
        } else {
            if (guest) {
                next();
            } else {
                return next(new ApiError(responseMessages.AUTH.TOKEN_NOT_FOUND, API_STATUS.BAD_REQUEST));
            }
        }
    });
};

export { checkAuth };

