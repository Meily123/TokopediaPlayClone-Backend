import {errorHandler} from "./middleware/error/errorHandler";

require('dotenv').config();

import connect from "./config/database/mongo";
import express from "express"
const auth = require("./middleware/authentication/auth");

const PORT = process.env.PORT;
const app = express();

import VideoRouter from './video/video.routes';
import UserRouter from "./user/user.routes";
import ProductRouter from "./product/product.routes";

connect();

// @ts-ignore
app.get("/welcome",auth, errorHandler, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.use("/user", UserRouter, errorHandler);
app.use('/videos', VideoRouter, errorHandler);
app.use("/products",ProductRouter, errorHandler);


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});