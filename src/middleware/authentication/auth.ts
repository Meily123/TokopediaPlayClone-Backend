import { ERROR_CODE } from "../../utils/error/errors";
import { AppError } from "../../utils/error/AppError";
import { IUser } from "../../user/user.interface";
const jwt = require("jsonwebtoken");

const config = process.env;

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// @ts-ignore
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || null;
    if (!authHeader) {
        throw new AppError(ERROR_CODE.FORBIDDEN);
    }

    try {
        const token = authHeader.split(' ')[1];
        req.user = jwt.verify(token, config.SECRET_KEY);
    } catch (err) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    return next();
};

module.exports = verifyToken;
