const endpoints = {
    AUTH: {
        LOGIN: `/auth/login`,
        LOGOUT: `/auth/logout`
    },
    EMAIL: {
        SEND: `/email/send`,
        GET_ALL_POSITIONS: `/email/positions`,
        GET_ALL_TEMPLATES: `/email/templates`,
        GET_ALL_SUBJECTS: `/email/subjects`
    }
}

export default endpoints;