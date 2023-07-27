import {IUserRequest} from "./user.interface";
const express = require('express');
const { registerUser, loginUser } = require('./user.service');
import bodyParser from "body-parser";

const router = express.Router();

router.post('/register', bodyParser.json(), async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        await registerUser(userData);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', bodyParser.json(), async (req, res, next) => {
    try {
        const userData: IUserRequest = req.body;
        const token = await loginUser(userData);
        res.status(200).json({ token: token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
