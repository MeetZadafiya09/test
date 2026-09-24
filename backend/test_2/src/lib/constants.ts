export const PRODUCTION_DOMAIN = ["https://email-sender.test"];
export const ALLOWED_DOMAIN = ["http://localhost:4200"];
export const ERROR_PREFIX = "_ERR_";

export const BULLMQ_PREFIX = "bullmq"
export const EMAIL_QUEUE = 'emails'


export const UPLOAD_PATH = 'public/';

export const PASSWORD_HASH_SALT = 12;

export const GLOBAL_RATE_LIMIT_MAX = 300
export const GLOBAL_RATE_LIMIT_WINDOW = 15 * 60 * 1000;

export const S3_EXPIRE_TIME = 60 * 30;

export const ERROR = "Error";

export const ALPHANUMERIC_STRING_REGEX = /^(?!-)(?!.*--)[A-Za-z0-9\s-]+(?<!-)$/;
export const NAME_STRING_REGEX = /^(?![\s-])(?!.*--)(?!.*\s{2,})[A-Za-z\s-]+(?<![\s-])$/;
export const ALPHABET_UNDERSCORE_REGEX = /^[A-Za-z_]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

export const FILE_UPLOAD = {
    IMAGE_ONLY: {
        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif']
    },
    IMAGE_OR_PDF: {
        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif', 'application/pdf']
    },
} as const;


export const STATUS_CODE = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    UNAUTHORIZED: "UNAUTHORIZED",
    TOKEN_EXPIRE: "TOKEN_EXPIRE"
} as const;

export const API_STATUS = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SUCCESS: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429
} as const;

export const JOI_VALIDATION_ERROR = {
    ANY_REQUIRED: 'any.required',
    STRING_EMPTY: 'string.empty',
    ANY_ONLY: 'any.only',
    ANY_INVALID: 'any.invalid',
    OBJECT_UNKNOWN: 'object.unknown',
    STRING_BASE: 'string.base',
    BOOLEAN_BASE: 'boolean.base',
    NUMBER_BASE: 'number.base',
    NUMBER_MAX: 'number.max',
    NUMBER_MIN: 'number.min',
    ARRAY_MIN: 'array.min',
    ARRAY_BASE: 'array.base',
    ARRAY_MAX: 'array.max',
    OBJECT_BASE: 'object.base',
    STRING_GUID: 'string.guid'
} as const;

export const FIREBASE_ERROR = {
    ARGUMENT_ERROR: "auth/argument-error",
    ID_TOKEN_EXPIRED: "auth/id-token-expired"
} as const;

export const DATABASE_ERROR = {
    SEQUELIZE_VALIDATION_ERROR: 'SequelizeValidationError',
    SEQUELIZE_UNIQUE_ERROR: 'SequelizeUniqueConstraintError'
} as const;

export const VALIDATION_ERROR = {
    NOT_NULL_VIOLATION: "notNull Violation",
    VALIDATION_ERROR: "Validation error",
    UNIQUE_VIOLATION: "unique violation"
} as const;

export const COMMON_ERROR = {
    TIMEOUT_ERROR: 'TimeoutError',
    MULTER_ERROR: 'MulterError'
} as const;

export const MULTER_ERROR_CODE = {
    LIMIT_FILE_SIZE: 'LIMIT_FILE_SIZE',
    LIMIT_UNEXPECTED_FILE: 'LIMIT_UNEXPECTED_FILE'
} as const;

export const TIMEOUT_ERROR_CODE = {
    ECONNRESET: "ECONNRESET"
} as const;

export const VALIDATOR_KEY = {
    NON_EMPTY: 'notEmpty',
    LEN: 'len'
} as const;

export const SOFT_DELETE_TYPE = {
    SOFT: 'soft',
    HARD: 'hard'
} as const;

export const EMAIL_TEMPLATES = {
    LINKEDIN1: 'linkedin1'
} as const;

export const EMAIL_SUBJECTS = {
    APPLICATION_FOR: 'Application For'
} as const;

export const JOB_POSITIONS = {
    FULL_STACK_DEVELOPER: 'Full Stack Developer',
    FRONTEND_DEVELOPER: 'Frontend Developer',
    SOFTWARE_ENGINEER: 'Software Engineer',
    FRONTEND_ENGINEER: 'Frontend Engineer',
    FULL_STACK_ENGINEER: 'Full Stack Engineer',
    REACT_JS_DEVELOPER: 'React Js Developer',
    NEXT_JS_DEVELOPER: 'Next Js Developer',
    NODE_JS_DEVELOPER: 'Node Js Developer',
    MERN_STACK_DEVELOPER: 'MERN Stack Developer',
    MEAN_STACK_DEVELOPER:'MEAN Stack Developer'
} as const;

export const OTP_VERIFY_TYPE = {
    EMAIL_VERIFICATION: 'email_verification'
} as const;

export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked'
} as const;

export const PLATFORM = {
    WEB: 'web',
    APP: 'app'
} as const;

export const ROLE_DESCRIPTION = {
    'Full Stack Developer': "Full Stack development, working extensively with React.js, Next.js, TypeScript, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, MySQL, Redis, Docker, Kubernetes, CI/CD, and AWS",
    
    'Full Stack Engineer': "Full Stack development, working extensively with React.js, Next.js, TypeScript, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, MySQL, Redis, Docker, Kubernetes, CI/CD, and AWS",
    
    'Frontend Developer': "Frontend development, specializing in building responsive user interfaces with React.js, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, HTML5, CSS3, and modern JavaScript",
    
    'Frontend Engineer': "Frontend engineering, building scalable and performant user interfaces using React.js, Next.js, TypeScript, Tailwind CSS, Webpack, Vite, Jest, Cypress, and modern web standards",
    
    'Software Engineer': "Software engineering, designing and developing scalable web applications using React.js, Node.js, TypeScript, PostgreSQL, Redis, Docker, microservices architecture, and cloud infrastructure",
    
    'React Js Developer': "React.js development, crafting high-performance user interfaces using React.js, Next.js, TypeScript, Redux, React Query, Zustand, Responsive Design, Tailwind CSS, and modern state management tools",
    
    'Next Js Developer': "Next.js development, building server-rendered, optimized web applications using Next.js, React.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Vercel/AWS architectures",
    
    'Node Js Developer': "Backend development, building robust server-side applications using Node.js, Express.js, NestJS, TypeScript, PostgreSQL, MongoDB, Redis, Kafka, Docker, and AWS",
    
    'MERN Stack Developer': "MERN stack development, building end-to-end applications with React.js, Next Js, Node.js, TypeScript, MongoDB, Express.js, Tailwind CSS, PostgreSQL, MySQL, Redis, AWS, CI/CD, Jenkins and Docker",
    
    'MEAN Stack Developer': "MEAN stack development, building full-stack enterprise applications using MongoDB, Express.js, Angular, TypeScript, Node.js, RxJS, and AWS"
};

export type StatusCode = (typeof STATUS_CODE)[keyof typeof STATUS_CODE];
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS];
export type FileUpload = (typeof FILE_UPLOAD)[keyof typeof FILE_UPLOAD];
export type JoiValidationError = (typeof JOI_VALIDATION_ERROR)[keyof typeof JOI_VALIDATION_ERROR];
export type DatabaseError = (typeof DATABASE_ERROR)[keyof typeof DATABASE_ERROR];
export type ValidationError = (typeof VALIDATION_ERROR)[keyof typeof VALIDATION_ERROR];
export type CommonError = (typeof COMMON_ERROR)[keyof typeof COMMON_ERROR];
export type MulterErrorCode = (typeof MULTER_ERROR_CODE)[keyof typeof MULTER_ERROR_CODE];
export type FirebaseErrorCode = (typeof FIREBASE_ERROR)[keyof typeof FIREBASE_ERROR];
export type TimeoutErrorCode = (typeof TIMEOUT_ERROR_CODE)[keyof typeof TIMEOUT_ERROR_CODE];
export type ValidatorKey = (typeof VALIDATOR_KEY)[keyof typeof VALIDATOR_KEY];
export type SoftDeleteType = (typeof SOFT_DELETE_TYPE)[keyof typeof SOFT_DELETE_TYPE];
export type EmailTemplates = (typeof EMAIL_TEMPLATES)[keyof typeof EMAIL_TEMPLATES];
export type EmailSubjects = (typeof EMAIL_SUBJECTS)[keyof typeof EMAIL_SUBJECTS];
export type OTPVerifyType = (typeof OTP_VERIFY_TYPE)[keyof typeof OTP_VERIFY_TYPE];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM];
export type RoleDescription = keyof typeof ROLE_DESCRIPTION;
