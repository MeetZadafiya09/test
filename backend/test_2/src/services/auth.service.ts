import { API_STATUS, USER_STATUS } from "../lib/constants.js";
import { responseMessages } from "../lib/messages.js";
import userRepository from "../repositories/user.repository.js";
import { getProfileData } from "../utils/profile.js";
import { ApiError } from "../utils/apiError.js";
import { generateToken } from "../utils/jwt.js";

const loginUser = async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (user) {
        if (await user.comparePassword(password)) {
            if (user.status === USER_STATUS.BLOCKED) {
                throw new ApiError(responseMessages.AUTH.USER_BLOCKED);
            } else {
                const token = await generateToken({
                    id: user.id.toString()
                })
                return {
                    message: responseMessages.AUTH.LOGIN_SUCCESS,
                    status: API_STATUS.SUCCESS,
                    data: {
                        token,
                        data: getProfileData(user)
                    }
                }
            }
        } else {
            throw new ApiError(responseMessages.AUTH.INVALID_CREDENTIALS);
        }
    } else {
        throw new ApiError(responseMessages.AUTH.INVALID_CREDENTIALS);
    }
}


export default {
    loginUser
}