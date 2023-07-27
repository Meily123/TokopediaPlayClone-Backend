// src/product/product.repository.ts
import { ProductModel } from './product.model';
import {IProduct, IProductDB} from './product.interface';
import { AppError } from "../utils/error/AppError";
import { ERROR_CODE } from "../utils/error/errors";

function mapToProductInterface(doc: any): IProductDB {
    return {
        id: doc._id.toString(),
        productUrl: doc.productUrl,
        title: doc.title,
        price: doc.price,
        discount: doc.discount,
        createdBy: doc.createdBy.toString(),
        imageUrl: doc.imageUrl,
    };
}

const createProduct= async (productInput: IProduct): Promise<IProduct> => {
    const product = await ProductModel.create(productInput);
    if (!product) {
        throw new AppError(ERROR_CODE.FAILED_CREATE_PRODUCT);
    }
    return mapToProductInterface(product.toJSON());
}

const getAllProducts = async (): Promise<IProduct[]> => {
    const products = await ProductModel.find().exec();
    return products.map((product) => mapToProductInterface(product.toJSON()));
}

const productRepositoty = {
    createProduct,
    getAllProducts,
}

export default productRepositoty;