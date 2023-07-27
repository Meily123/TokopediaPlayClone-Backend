import { createProduct, getAllProducts } from './product.repository';
import {IProduct, IProductInput} from './product.interface';
import { AppError } from '../utils/error/AppError';
import {ERROR_CODE} from "../utils/error/errors";

const { findUserByUsername } = require('../user/user.repository');


// @ts-ignore
export async function addProduct(productInput: IProductInput, userReq): Promise<IProduct> {
    const user = await findUserByUsername(userReq.username);

    // @ts-ignore
    const product = await createProduct({
        ...productInput,
        createdBy: user.id,
    });

    if (!product) {
        throw new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR, 'Failed to add product.');
    }
    return product;
}

export async function retrieveAllProducts(): Promise<IProduct[]> {
    const products = await getAllProducts();
    if (!products) {
        throw new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR, 'Failed to retrieve products.');
    }
    return products;
}