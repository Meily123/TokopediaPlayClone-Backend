// src/video/video.repository.ts
import { VideoModel} from './video.model';
import {IVideoInput, IVideo} from "./video.interface";
import {ObjectId} from "mongoose";

export async function createVideo(videoInput: IVideoInput): Promise<IVideo> {
    return VideoModel.create(videoInput);
}

export async function getAllVideos(): Promise<IVideo[]> {
    return VideoModel.find().exec();
}

export async function getVideoById(id: string): Promise<IVideo | null> {
    return VideoModel.findById(id).exec();
}

export async function addProductToVideo(videoId: string, productId: ObjectId): Promise<IVideo | null> {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.products.push(productId);
    return video.save();
}

export async function addCommentToVideo(videoId: ObjectId, commentId: ObjectId): Promise<IVideo | null> {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.comments.push(commentId);
    return video.save();
}