// src/repositories/userRepository.js
import {IUser, IUserRequest} from "./user.interface";

const User = require('./user.model');

const createUser = async (userData: IUserRequest): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};

const findUserByUsername = async (username) => {
    return User.findOne({ username });
};

module.exports = {
    createUser,
    findUserByUsername,
};
