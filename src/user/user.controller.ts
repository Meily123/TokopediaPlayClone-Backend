import {IUserRequest} from "./user.interface";
import userService from "./user.service";


const register =  async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        await userService.registerUser(userData);
        res.status(201).json({ data: {message: 'User registered successfully'}});
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        const token = await userService.loginUser(userData);
        res.status(200).json({data:{ token: token }});
    } catch (error) {
        next(error);
    }
};

const getSelfUser = async (req, res, next) => {
    try {
        const username = req.user.username;
        const user = await userService.getUserByUsername(username);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

const userController = {
    register,
    login,
    getSelfUser,
}

export default userController;

