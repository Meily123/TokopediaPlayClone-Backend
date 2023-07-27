import bodyParser from "body-parser";
import express from "express";
import productController from "./product.controller";

const ProductRouter = express.Router();

const auth = require("../middleware/authentication/auth");

ProductRouter.use(bodyParser.json());

ProductRouter.post('/', auth, productController.createProduct);
ProductRouter.get('/', productController.getAllProduct);

export default ProductRouter;