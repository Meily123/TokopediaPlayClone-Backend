import bodyParser from "body-parser";
import userController from "./user.controller";
import express from "express";

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);

export default userRouter;