import {ObjectId} from "mongoose";

export interface IProductDB extends IProduct{
    id: ObjectId;
}

export interface IProduct extends IProductInput{
    createdBy: ObjectId;
}

export interface IProductInput {
    productUrl: string;
    title: string;
    price: number;
    discount: number;
    imageUrl: string;
}