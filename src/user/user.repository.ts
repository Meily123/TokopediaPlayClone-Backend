// src/repositories/userRepository.js
import {IUser, IUserRequest} from "./user.interface";
import {User} from "./user.model";

const createUser = async (userData: IUserRequest): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};

const findUserByUsername = async (username) => {
    return User.findOne({ username });
};

const userRepository = {
    createUser,
    findUserByUsername,
};

export default userRepository;
