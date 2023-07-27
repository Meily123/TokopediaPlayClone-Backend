import {AppError} from "../../utils/error/AppError";

// @ts-ignore
export const errorHandler = (err: Error, req, res, next) => {
    console.log('Path:', req.path);
    console.error('Error occured:\n', err);
    if (err instanceof AppError) {
        res.status(err.status).send(err.getErrorResponse());
    } else {
        res.status(500).send({
            code: "INTERNAL SERVER ERROR",
            messege: "An internal server error occurred. Please try again later."
        });
    }
};