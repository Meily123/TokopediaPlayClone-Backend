// src/product/product.controller.ts
import {IProductInput} from './product.interface';
import { addProduct, retrieveAllProducts } from './product.service';
import bodyParser from "body-parser";
import express from "express";

const router = express.Router();

router.post('/', bodyParser.json(), async (req, res, next) => {
    try {
        const productRequest: IProductInput = req.body;
        const product = await addProduct(productRequest, req.user);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

// @ts-ignore
router.get('/', async (req, res, next) => {
    try {
        const products = await retrieveAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
