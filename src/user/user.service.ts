import {IUserRequest, IUserResponse} from "./user.interface";
import {AppError} from "../utils/error/AppError";
import {ERROR_CODE} from "../utils/error/errors";
import UserRepository from "./user.repository";

require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (userData: IUserRequest): Promise<IUserResponse> => {
    const { username, password, imageUrl } = userData;

    const existingUser = await UserRepository.findUserByUsername(username);
    if (existingUser) {
        throw new AppError(ERROR_CODE.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRepository.createUser({
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


const loginUser = async (userData: IUserRequest): Promise<string> => {
    const { username, password } = userData;

    const user = await UserRepository.findUserByUsername(username);
    if (!user) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    user.token = token;
    await user.save();

    return token;
}

const getUserByUsername= async (username: string): Promise<IUserResponse | null> => {
    const user= await UserRepository.findUserByUsername (username);

    const result:IUserResponse = {
        username: user.username,
        imageUrl: user.imageUrl
    }

    return result;
}


const userService = {
    registerUser,
    loginUser,
    getUserByUsername,
};

export default userService;