const responseMessages = {
    EMAIL: {
        GET_ALL_POSITIONS_SUCCESS: 'Positions fetched successfully',
        GET_ALL_TEMPLATES_SUCCESS: 'Templates fetched successfully',
        GET_ALL_SUBJECTS_SUCCESS: 'Subjects fetched successfully',
        SEND_EMAIL_SUCCESS: 'Email sent successfully',
    },
    AUTH:{
        UNAUTHORIZED: 'Unauthorized',
        INVALID_CREDENTIALS: 'Email or password is incorrect',
        USER_BLOCKED: 'User is blocked',
        USER_NOT_EXIST: 'User not exist',
        INVALID_PASSWORD: 'Invalid password',
        LOGIN_SUCCESS: 'Login successfully',
        PROVIDER_TOKEN_INVALID: 'Provider token is invalid',
        PROVIDER_TOKEN_EXPIRED: 'Provider token is expired',
        LOGOUT_SUCCESS: 'Logout successfully',
        ACCESS_TOKEN_EXPIRED: 'Access token expired',
        INVALID_ACCESS_TOKEN: 'Invalid access token',
        INVALID_CSRF_TOKEN: 'Invalid CSRF token',
        TOKEN_NOT_FOUND: 'Token not found',
    },  
    FILE: {
        FILE_NOT_FOUND: 'File not found',
        FILE_UPLOAD_FAILED: 'File upload failed',
    },
    TEAM: {
        TEAM_ALREADY_RESTORED: 'Team already restored',
        NOT_FOUND: 'Team not found',
        CREATE_SUCCESS: 'Team created successfully',
        GET_ALL_SUCCESS: 'Teams fetched successfully',
        GET_SUCCESS: 'Team fetched successfully',
        UPDATE_SUCCESS: 'Team updated successfully',
        DELETE_SUCCESS: 'Team deleted successfully',
        RESTORE_SUCCESS: 'Team restored successfully',
    },
    COMMON: {
        BAD_REQUEST: 'Bad request',
        INTERNAL_SERVER_ERROR: 'Internal server error',
        SOMETHING_WENT_WRONG: 'Something went wrong',
        REQUEST_TIMEOUT: 'Request timeout',
        TOO_MANY_REQUESTS: 'Too many requests. Please try again later.'
    }
}

const validationMessages = {
    EMAIL: {
        EMAIL_INVALID: 'Email is invalid',
    },
    TEAM: {
        NAME_INVALID: 'Team name is invalid',
        LOGO_IMAGE_INVALID: 'Team logo image is invalid',
        LOGO_IMAGE_REQUIRED: 'Team logo image is required',
    },
    FILE: {
        FILE_TYPE_NOT_ALLOWED: 'File type not allowed.',
    },
    COMMON: {
        DATA_REQUIRED: 'Data is required',
        FROM_REQUIRED: 'From is required',
        TO_REQUIRED: 'To is required',
        FROM_INVALID: 'From is invalid',
        TO_INVALID: 'To is invalid',
        ID_INVALID:"ID is not valid",
        DELETE_TYPE_INVALID: 'Delete type is invalid',
        REASON_INVALID: 'Reason is not valid'
    }
}

export {
    responseMessages,
    validationMessages
}