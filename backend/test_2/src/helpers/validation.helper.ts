import Joi from "joi";
import { ALPHABET_UNDERSCORE_REGEX, ALPHANUMERIC_STRING_REGEX, EMAIL_REGEX, NAME_STRING_REGEX } from "../lib/constants.js";
import { validationMessages } from "../lib/messages.js";

type SingleFileValidationParams = {
    allowedTypes?: string[];
    maxFileSizeMB?: number;
    required?: boolean;
};


const requiredString = Joi.string().required();
const optionalString = Joi.string().allow(null, "").optional();

const booleanValidation = (optional: boolean = false) => {
    if (optional) {
        return Joi.boolean().optional();
    } else {
        return Joi.boolean().required();
    }
}

const nameValidation = (message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.string().optional().pattern(NAME_STRING_REGEX).messages({
            "string.pattern.base": message
        });
    } else {
        return Joi.string().required().pattern(NAME_STRING_REGEX).messages({
            "string.pattern.base": message
        });
    }
};

const alphanumericStringValidation = (message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.string().optional().allow(null, "").pattern(ALPHANUMERIC_STRING_REGEX).messages({
            "string.pattern.base": message
        });
    } else {
        return Joi.string().required().pattern(ALPHANUMERIC_STRING_REGEX).messages({
            "string.pattern.base": message
        });
    }
};



const fileValidation = (message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.any().optional().custom((value, helpers) => {
            if (!value || !value.length || Array.isArray(value[0])) {
                return helpers.error("any.custom");
            }
            return value;
        }).messages({
            "any.custom": message
        });
    } else {
        return Joi.any().required().custom((value, helpers) => {
            if (!value || !value.length || Array.isArray(value[0])) {
                return helpers.error("any.custom");
            }
            return value;
        }).messages({
            "any.custom": message
        });
    }
};



const enumValidation = (values: string[], optional: boolean = false) => {
    if (optional) {
        return Joi.string().optional().valid(...values);
    } else {
        return Joi.string().required().valid(...values);
    }
}

const integerRangeValidation = (min: number, max: number, optional: boolean = false) => {
    if (optional) {
        return Joi.number().integer().min(min).max(max).optional();
    } else {
        return Joi.number().integer().min(min).max(max).required();
    }
}

const integerValidation = (optional: boolean = false) => {
    if (optional) {
        return Joi.number().integer().min(1).optional()
    } else {
        return Joi.number().integer().min(1).required()
    }
}
interface StringArrayValidationOptions {
    min?: number;
    max?: number;
    enum?: string[];
}

const stringArrayValidation = (options: StringArrayValidationOptions = {}, optional: boolean = false) => {
    let itemSchema = Joi.string().required();
    if (optional) {
        itemSchema = Joi.string().optional();
    }
    if (Array.isArray(options.enum) && options.enum.length > 0) {
        itemSchema = itemSchema.valid(...options.enum);
    }

    let schema = Joi.array().items(itemSchema).required();

    if (typeof options.min === "number") {
        schema = schema.min(options.min);
    }
    if (typeof options.max === "number") {
        schema = schema.max(options.max);
    }
    if (optional) {
        return schema.optional();
    } else {
        return schema.required();
    }
}


const optionalField = Joi.any().optional();


const regEXValidation = (regEX: RegExp, message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.string().optional().allow(null, "").regex(regEX).messages({
            "string.pattern.base": message
        });
    } else {
        return Joi.string().required().pattern(regEX).messages({
            "string.pattern.base": message
        });
    }
}


const singleFileValidation = (message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.any().optional().custom((value, helpers) => {
            if (!value || Object.keys(value).length === 0) {
                return helpers.error("any.custom");
            }
            return value;
        }).messages({
            "any.custom": message
        });
    } else {
        return Joi.any().required().custom((value, helpers) => {
            if (!value || Object.keys(value).length === 0) {
                return helpers.error("any.custom");
            }
            return value;
        }).messages({
            "any.custom": message
        });
    }
};


const singleFileValidationWithOptions = (
    message: string, requiredMessage: string,
    {
        allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
        maxFileSizeMB = 5,
        required = true,
    }: SingleFileValidationParams = {}
) => {
    const maxBytes = maxFileSizeMB * 1024 * 1024;
    const schema = Joi.object({
        mimetype: Joi.string()
            .valid(...allowedTypes)
            .required()
            .messages({ "any.only": message }),
        size: Joi.number()
            .max(maxBytes)
            .required()
            .messages({
                "number.max": `File size must be less than ${maxFileSizeMB} MB`,
            }),
    }).unknown(true);
    return required ? schema.required().messages({
        "any.required": requiredMessage
    }) : schema.optional();
};

const alphabetUnderscoreValidation = (message: string, optional: boolean = false) => {
    if (optional) {
        return Joi.string().optional().allow(null, "").pattern(ALPHABET_UNDERSCORE_REGEX).messages({
            "string.pattern.base": message
        });
    } else {
        return Joi.string().required().pattern(ALPHABET_UNDERSCORE_REGEX).messages({
            "string.pattern.base": message
        });
    }
};

const uuidValidation = (optional: boolean = false) => {
    if (optional) {
        return Joi.string().uuid().optional();
    } else {
        return Joi.string().uuid().required();
    }
}

const emailValidation = Joi.string()
    .required()
    .pattern(EMAIL_REGEX)
    .messages({
        "string.pattern.base": validationMessages.EMAIL.EMAIL_INVALID
    });

export {
    requiredString,
    optionalString,
    enumValidation,
    nameValidation,
    alphanumericStringValidation,
    fileValidation,
    optionalField,
    booleanValidation,
    integerRangeValidation,
    stringArrayValidation,
    regEXValidation,
    integerValidation,
    singleFileValidation,
    singleFileValidationWithOptions,
    alphabetUnderscoreValidation,
    uuidValidation,
    emailValidation
};