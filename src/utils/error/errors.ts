enum ERROR_CODE {
    NOT_FOUND= 'NOT_FOUND',
    BAD_REQUEST= 'BAD_REQUEST',
    UNAUTHORIZED= 'UNAUTHORIZED',
    FORBIDDEN= 'FORBIDDEN',
    INTERNAL_SERVER_ERROR= 'INTERNAL_SERVER_ERROR',
    CONFLICT= 'CONFLICT',
    VALIDATION_ERROR= 'VALIDATION_ERROR',
    FAILED_CREATE_PRODUCT= 'FAILED_CREATE_PRODUCT',
};

const ERROR_LIST = {
    [ERROR_CODE.NOT_FOUND]: {
        statusCode: 404,
        message: 'The requested resource was not found.',
    },
    [ERROR_CODE.BAD_REQUEST]: {
        statusCode: 400,
        message: 'Bad request. Please provide valid data.',
    },
    [ERROR_CODE.UNAUTHORIZED]: {
        statusCode: 401,
        message: 'Authentication failed. Invalid token.',
    },
    [ERROR_CODE.FORBIDDEN]: {
        statusCode: 403,
        message: 'You are not authorized to access this resource.',
    },
    [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
        statusCode: 500,
        message: 'An internal server error occurred. Please try again later.',
    },
    [ERROR_CODE.CONFLICT]: {
        statusCode: 409,
        message: 'There was a conflict with the current state of the resource.',
    },
    [ERROR_CODE.VALIDATION_ERROR]: {
        statusCode: 422,
        message: 'Input validation failed. Please check your data.',
    },
    [ERROR_CODE.FAILED_CREATE_PRODUCT]: {
        statusCode: 400,
        message: 'Creating product failed.',
    },
};
export {ERROR_LIST, ERROR_CODE};