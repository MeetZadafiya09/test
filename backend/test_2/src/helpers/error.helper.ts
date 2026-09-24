import { API_STATUS, COMMON_ERROR, DATABASE_ERROR, ERROR, FIREBASE_ERROR, JOI_VALIDATION_ERROR, MULTER_ERROR_CODE, TIMEOUT_ERROR_CODE, VALIDATION_ERROR, VALIDATOR_KEY } from "../lib/constants.js";
import { ERRORS_MESSAGE } from "../lib/errors.js";
import { responseMessages } from "../lib/messages.js";
import { formatFieldName, getErrorMessage, getLengthValidationMessage, isCustomErrorMessage } from "../utils/format.js";

const checkValidationErrors = (err: any) => {
    let error: { message: string; status: number; custom?: boolean } = { message: err.message, status: API_STATUS.BAD_REQUEST, custom: false };
    if (err.custom) {
        error.message = err.message;
        error.status = err.status || API_STATUS.BAD_REQUEST;
    }
    // else if (err.name === JWT_ERROR.JWSSIGNATURE_VERIFICATION_FAILED || err.name === JWT_ERROR.JWS_INVALID) {
    //     error.message = responseMessages.AUTH.INVALID_ACCESS_TOKEN;
    //     error.status = API_STATUS.UNAUTHORIZED;
    // }
    // else if (err.name === JWT_ERROR.TOKEN_EXPIRED) {
    //     error.message = responseMessages.AUTH.ACCESS_TOKEN_EXPIRED;
    //     error.status = API_STATUS.UNAUTHORIZED;
    // }
    // else if (err.name === DATABASE_ERROR.MONGOSERVER_ERROR) {
    //     if (err.code === DUPLICATE_ERROR_CODE) {
    //         const field = Object.keys(err.keyValue)[0];
    //         error.message = field ? `${formatFieldName(field)} is already exists.` : err.message;
    //         error.status = API_STATUS.CONFLICT;
    //     } else {
    //         error.message = err.message;
    //         error.status = API_STATUS.BAD_REQUEST;
    //     }
    // }
    else if (err.name === DATABASE_ERROR.SEQUELIZE_VALIDATION_ERROR || err.name === DATABASE_ERROR.SEQUELIZE_UNIQUE_ERROR) {
        for (const field of err.errors) {
            const validationError = field.type;
            if (isCustomErrorMessage(field.message)) {
                error.message = getErrorMessage(field.message);
                error.status = API_STATUS.BAD_REQUEST;
                break;
            } else {
                if (validationError === VALIDATION_ERROR.NOT_NULL_VIOLATION) {
                    error.message = `${formatFieldName(field.path)} is required.`;
                    error.status = API_STATUS.BAD_REQUEST;
                    break;
                } else if (validationError === VALIDATION_ERROR.VALIDATION_ERROR) {
                    if (field.validatorKey === VALIDATOR_KEY.NON_EMPTY) {
                        error.message = `${formatFieldName(field.path)} is required.`;
                        error.status = API_STATUS.BAD_REQUEST;
                    } else if (field.validatorKey === VALIDATOR_KEY.LEN) {
                        error.message = getLengthValidationMessage(field.path, field.validatorArgs);
                        error.status = API_STATUS.BAD_REQUEST;
                    }
                    break;
                } else if (validationError === VALIDATION_ERROR.UNIQUE_VIOLATION) {
                    error.message = `${formatFieldName(field.path)} already exists.`;
                    error.status = API_STATUS.CONFLICT;
                    break;
                }
            }

            // if (validationError.kind === VALIDATION_ERROR.ENUM) {
            //     if (!isDefaultMongooseMessage(validationError.message)) {
            //         error.message = validationError.message;
            //         error.status = API_STATUS.BAD_REQUEST;
            //     } else {
            //         error.message = `${formatFieldName(field)} is invalid.`;
            //         error.status = API_STATUS.BAD_REQUEST;
            //     }
            //     break;
            // }
            // if (validationError.kind === VALIDATION_ERROR.MAX) {
            //     const properties = validationError.properties;
            //     if ((properties.max || properties.max == 0) && (properties.value || properties.value == 0)) {
            //         error.message = `${formatFieldName(field)} (${properties.value}) is more than maximum allowed value ${properties.max}`;
            //     } else {
            //         error.message = validationError.message;
            //     }
            //     error.status = API_STATUS.BAD_REQUEST;
            //     break;
            // }
            // if (validationError.kind === VALIDATION_ERROR.MIN) {
            //     const properties = validationError.properties;
            //     if ((properties.min || properties.min == 0) && (properties.value || properties.value == 0)) {
            //         error.message = `${formatFieldName(field)} (${properties.value}) is less than minimum allowed value ${properties.min}`;
            //     } else {
            //         error.message = validationError.message;
            //     }
            //     error.status = API_STATUS.BAD_REQUEST;
            //     break;
            // }
        }
    } else if (err.name === COMMON_ERROR.MULTER_ERROR) {
        if (err.code === MULTER_ERROR_CODE.LIMIT_FILE_SIZE) {
            error.message = formatFieldName(err.field) + " is too large";
            error.status = API_STATUS.BAD_REQUEST;
        }else if (err.code === MULTER_ERROR_CODE.LIMIT_UNEXPECTED_FILE) {
            error.message = `${formatFieldName(err.field)} is not allowed`;
            error.status = API_STATUS.BAD_REQUEST;
        }
    }
    else if (err.name === ERROR) {
        if (err.code === FIREBASE_ERROR.ARGUMENT_ERROR) {
            error.message = responseMessages.AUTH.PROVIDER_TOKEN_INVALID;
        } else if (err.code === FIREBASE_ERROR.ID_TOKEN_EXPIRED) {
            error.message = responseMessages.AUTH.PROVIDER_TOKEN_EXPIRED;
        } 
        error.status = err.status || API_STATUS.BAD_REQUEST;
    }
    else if (err.name === COMMON_ERROR.TIMEOUT_ERROR) {
        if (err.code === TIMEOUT_ERROR_CODE.ECONNRESET) {
            error.message = responseMessages.COMMON.REQUEST_TIMEOUT;
            error.status = API_STATUS.INTERNAL_SERVER_ERROR;
        } else {
            error.message = responseMessages.COMMON.SOMETHING_WENT_WRONG;
            error.status = API_STATUS.BAD_REQUEST;
        }
    }
    else {
        error.message = err.message;
        error.status = API_STATUS.BAD_REQUEST;
    }
    return error;
}

const formatValidationError = (error: any) => {
    const details = error.details[0];
    let err: { message: string; status: number } = { message: error.message, status: API_STATUS.BAD_REQUEST };
    if (
        details.type === JOI_VALIDATION_ERROR.ANY_REQUIRED ||
        details.type === JOI_VALIDATION_ERROR.OBJECT_UNKNOWN ||
        details.type === JOI_VALIDATION_ERROR.STRING_BASE ||
        details.type === JOI_VALIDATION_ERROR.BOOLEAN_BASE ||
        details.type === JOI_VALIDATION_ERROR.NUMBER_BASE ||
        details.type === JOI_VALIDATION_ERROR.NUMBER_MAX ||
        details.type === JOI_VALIDATION_ERROR.NUMBER_MIN ||
        details.type === JOI_VALIDATION_ERROR.ARRAY_MIN ||
        details.type === JOI_VALIDATION_ERROR.ARRAY_MAX ||
        details.type === JOI_VALIDATION_ERROR.ARRAY_BASE ||
        details.type === JOI_VALIDATION_ERROR.OBJECT_BASE
    ) {
        err.message = error.message
            .replace(/["\\]/g, "")
            .replace(/^body\./, "")
            .replace(/^query\./, "")
            .replace(/^params\./, "")
            .replace(/^files\./, "")
            .replace(/_/g, " ");
        err.message = err.message.charAt(0).toUpperCase() + err.message.slice(1);
    } else if (details.type === JOI_VALIDATION_ERROR.STRING_EMPTY) {
        let field = details.path.at(details.path.length - 1);
        if (typeof field === 'number') {
            field = details.path.at(-2);
        }
        const fieldName = formatFieldName(field);
        err.message = `${fieldName} is required`;
    }
    else if (details.type === JOI_VALIDATION_ERROR.ANY_ONLY || details.type === JOI_VALIDATION_ERROR.STRING_GUID) {
        let field = details.path.at(details.path.length - 1);
        if (typeof field === 'number') {
            field = details.path.at(-2);
        }
        const fieldName = formatFieldName(field);
        err.message = `${fieldName} is not valid`;
    }
    else {
        err.message = error.message;
    }
    return err;

}

export { formatValidationError, checkValidationErrors };