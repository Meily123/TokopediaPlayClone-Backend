import {errorHandler} from "./middleware/error/errorHandler";

require('dotenv').config();

import connect from "./config/database/mongo";
import express from "express"
const auth = require("./middleware/authentication/auth");

const PORT = process.env.PORT;
const app = express();

const userController = require("./user/user.controller");
const productController = require("./product/product.controller");
import videoRouter from './video/video.routes';

connect();

// @ts-ignore
app.get("/welcome",auth, errorHandler, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.use("/user", userController, errorHandler);
app.use('/videos', videoRouter);

// Routes
app.use("/products",auth, productController, errorHandler);


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});