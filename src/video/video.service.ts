// src/video/video.service.ts
import { IVideoInput, IVideo } from './video.interface';
import { createVideo, getAllVideos, getVideoById, addProductToVideo as addToVideo } from './video.repository';
import {ProductModel} from "../product/product.model";

export async function addVideo(videoInput: IVideoInput): Promise<IVideo> {
    return createVideo(videoInput);
}

export async function retrieveAllVideos(): Promise<IVideo[]> {
    return getAllVideos();
}

export async function retrieveVideoById(id: string): Promise<IVideo | null> {
    return getVideoById(id);
}

export async function addProductToVideo(videoId: string, productId: string): Promise<IVideo | null> {
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
        return null;
    }

    return addToVideo(videoId, product.id);
}