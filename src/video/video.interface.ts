// src/video/video.interface.ts
import { ObjectId } from 'mongoose';

export interface IVideoInput {
    like?: number;
    thumbnailUrl: string;
    views?: number;
    kategori: string;
    description: string;
    createdBy: ObjectId;
    videoUrl: string;
    products?: ObjectId[];
}

export interface IVideo extends IVideoInput {
    id: ObjectId;
}
