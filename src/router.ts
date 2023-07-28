import UserRouter from "./user/user.routes";
import {errorHandler} from "./middleware/error/errorHandler";
import VideoRouter from "./video/video.routes";
import ProductRouter from "./product/product.routes";

import express from "express";
const router = express.Router();

router.use("/users", UserRouter, errorHandler);
router.use('/videos', VideoRouter, errorHandler);
router.use("/products",ProductRouter, errorHandler);

export default router;
