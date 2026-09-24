const STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    CONFLIT: 409,
    NOT_FOUND: 404
} as const;

export type StatusCode = (typeof STATUS_CODE)[keyof typeof STATUS_CODE]

const SUCCESS_STATUS_CODE: StatusCode[] = [STATUS_CODE.SUCCESS] as const;


export { STATUS_CODE, SUCCESS_STATUS_CODE }

