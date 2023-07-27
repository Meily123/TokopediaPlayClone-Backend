import {IUserRequest} from "./user.interface";
const { registerUser, loginUser } = require('./user.service');


const register =  async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        await registerUser(userData);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        const token = await loginUser(userData);
        res.status(200).json({ token: token });
    } catch (error) {
        next(error);
    }
};

const userController = {
    register,
    login
}

export default userController;

