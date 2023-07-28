import productRepository from "./product.repository";
import {IProduct, IProductInput} from './product.interface';
import { AppError } from '../utils/error/AppError';
import {ERROR_CODE} from "../utils/error/errors";
import userRepository from "../user/user.repository";


// @ts-ignore
const addProduct = async (productInput: IProductInput, userReq): Promise<IProduct> => {
    const user = await userRepository.findUserByUsername(userReq.username);

    // @ts-ignore
    const product = await productRepository.createProduct({
        ...productInput,
        createdBy: user.id,
    });

    if (!product) {
        throw new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }

    return product;
}

const retrieveAllProducts = async (): Promise<IProduct[]> => {
    const products = await productRepository.getAllProducts();
    if (!products) {
        throw new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
    return products;
}

const productService = {
    addProduct,
    retrieveAllProducts,
}

export default productService;