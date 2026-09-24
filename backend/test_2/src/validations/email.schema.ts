import Joi from "joi";
import { booleanValidation, emailValidation, enumValidation, integerValidation, optionalString } from "../helpers/validation.helper.js";
import { EMAIL_SUBJECTS, EMAIL_TEMPLATES, JOB_POSITIONS } from "../lib/constants.js";

const singleOrArrayOfEmails = Joi.alternatives().try(
    emailValidation,
    Joi.array().items(emailValidation).min(1).messages({
        "array.includes": "One or more email addresses are invalid"
    })
).messages({
    "alternatives.types": "Value must be a valid email or an array of valid emails"
});

const sendEmailSchema = Joi.object({
    body: Joi.object({
        to: singleOrArrayOfEmails,
        experience: integerValidation(),
        position: enumValidation(Object.values(JOB_POSITIONS)),
        company_name: optionalString,
        person_name: optionalString,
        subject: enumValidation(Object.values(EMAIL_SUBJECTS)),
        template: enumValidation(Object.values(EMAIL_TEMPLATES)),
        send_resume: booleanValidation()
    }).required()
})

export { sendEmailSchema };