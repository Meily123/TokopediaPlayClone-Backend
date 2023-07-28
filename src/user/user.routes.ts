import bodyParser from "body-parser";
import userController from "./user.controller";
import express from "express";

const UserRouter = express.Router();
const auth = require("../middleware/authentication/auth");

UserRouter.use(bodyParser.json());

UserRouter.post('/login', userController.login);
UserRouter.post('/register', userController.register);
UserRouter.get('/', auth, userController.getSelfUser)

export default UserRouter;