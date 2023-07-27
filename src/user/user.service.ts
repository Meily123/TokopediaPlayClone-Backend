import {IUser, IUserRequest, IUserResponse} from "./user.interface";
import {AppError} from "../utils/error/AppError";
import {ERROR_CODE} from "../utils/error/errors";

require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('./user.repository');

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (userData: IUserRequest): Promise<IUserResponse> => {
    const { username, password, imageUrl } = userData;

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        throw new AppError(ERROR_CODE.BAD_REQUEST, 'Username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
        username,
        password: hashedPassword,
        imageUrl,
    });

    const response: IUserResponse = {
        username: newUser.username,
        imageUrl: newUser.imageUrl,
    };
    return response;
};


export async function loginUser(userData: IUserRequest): Promise<string> {
    const { username, password } = userData;

    const user = await findUserByUsername(username);
    if (!user) {
        throw new AppError(ERROR_CODE.NOT_FOUND, 'User not found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED, 'Invalid credentials.');
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    user.token = token;
    await user.save();

    return token;
}

const getUserByUsername= async (username: string): Promise<IUser | null> => {
    const user = await findUserByUsername(username);
    return user;
}

module.exports = {
    registerUser,
    loginUser,
    getUserByUsername,
};
