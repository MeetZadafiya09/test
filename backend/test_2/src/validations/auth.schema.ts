import Joi from "joi";
import { emailValidation, requiredString } from "../helpers/validation.helper.js";

const loginSchema = Joi.object({
    body: Joi.object({
        email: emailValidation,
        password: requiredString
    }).required()
})

export { loginSchema };