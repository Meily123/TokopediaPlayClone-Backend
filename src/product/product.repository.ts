// src/product/product.repository.ts
import { ProductModel } from './product.model';
import {IProduct, IProductDB} from './product.interface';
import { AppError } from "../utils/error/AppError";
import { ERROR_CODE } from "../utils/error/errors";

// Map Mongoose Document to IProduct interface
function mapToProductInterface(doc: any): IProductDB {
    return {
        id: doc._id.toString(), // Convert ObjectId to string
        productUrl: doc.productUrl,
        title: doc.title,
        price: doc.price,
        discount: doc.discount,
        createdBy: doc.createdBy.toString(), // Convert ObjectId to string
        imageUrl: doc.imageUrl,
    };
}

export async function createProduct(productInput: IProduct): Promise<IProduct> {
    const product = await ProductModel.create(productInput);
    if (!product) {
        throw new AppError(ERROR_CODE.INTERNAL_SERVER_ERROR, 'Failed to add product.');
    }
    return mapToProductInterface(product.toJSON());
}

export async function getAllProducts(): Promise<IProduct[]> {
    const products = await ProductModel.find().exec();
    return products.map((product) => mapToProductInterface(product.toJSON()));
}
