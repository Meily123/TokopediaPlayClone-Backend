import bodyParser from "body-parser";
import userController from "./user.controller";
import express from "express";

const UserRouter = express.Router();

UserRouter.use(bodyParser.json());

UserRouter.post('/login', userController.login);
UserRouter.post('/register', userController.register);

export default UserRouter;