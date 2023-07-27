import {ERROR_CODE, ERROR_LIST} from './errors';
import {IErrorResponse} from "./error.interface";
import {get} from "../common/helper";

export class AppError extends Error {
    public status: number = null;
    public errorCode: string;

    details?: any;
    constructor(errorCode: string = ERROR_CODE.INTERNAL_SERVER_ERROR, details: any = null) {
        super(errorCode);
        Object.setPrototypeOf(this, new.target.prototype);
        const error = get(ERROR_LIST, errorCode);
        this.errorCode = errorCode;
        this.status = error.statusCode;
        this.message = error.message;
        this.details = details;
    }

    getErrorResponse() {
        const response: IErrorResponse = {
            code: this.errorCode,
            message: this.message,
        };

        return response;
    }
}
