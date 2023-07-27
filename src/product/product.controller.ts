import {IProductInput} from './product.interface';
import productService from './product.service';

const createProduct = async (req, res, next) => {
    try {
        const productRequest: IProductInput = req.body;
        const product = await productService.addProduct(productRequest, req.user);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// @ts-ignore
const getAllProduct = async (req, res, next) => {
    try {
        const products = await productService.retrieveAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const productController = {
    createProduct,
    getAllProduct
}

export default productController;