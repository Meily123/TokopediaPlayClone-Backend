import {errorHandler} from "./middleware/error/errorHandler";

require('dotenv').config();

import connect from "./config/database/mongo";
import express from "express";
import router from "./router";
const auth = require("./middleware/authentication/auth");
const cors = require ('cors');
const PORT = process.env.PORT;
const app = express();

connect();

// @ts-ignore
app.get("/welcome",auth, errorHandler, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.use(cors())

app.use(router);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});