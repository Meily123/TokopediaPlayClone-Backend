import { ObjectId } from 'mongoose';

export interface IVideoInput {
    likes?: ObjectId[];
    thumbnailUrl: string;
    views?: number;
    category: string;
    description: string;
    createdBy: ObjectId;
    videoUrl: string;
    products?: ObjectId[];
}

export interface IVideo extends IVideoInput {
    id: ObjectId;
}
