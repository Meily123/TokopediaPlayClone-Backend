import { VideoModel} from './video.model';
import {IVideoInput, IVideo} from "./video.interface";
import {ObjectId} from "mongoose";

const createVideo = async (videoInput: IVideoInput): Promise<IVideo> => {
    return VideoModel.create(videoInput);
};

const getAllVideos = async (): Promise<IVideo[]> => {
    return VideoModel.find().exec();
}

const getVideoById = async (id: string): Promise<IVideo | null> => {
    return await VideoModel.findById(id).exec();
}

const addProductToVideo = async (videoId: string, productId: ObjectId): Promise<IVideo | null> => {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.products.push(productId);
    return video.save();
}

const likeVideo = async (videoId: string, userId: ObjectId): Promise<IVideo | null> => {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.likes.push(userId);
    return video.save();
}

const unlikeVideo = async (videoId: string, userId: ObjectId): Promise<IVideo | null> => {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.likes = video.likes.filter((id) => id.toString() !== userId.toString());
    return await video.save();
}

const updateVideoViews = async (videoId: string): Promise<IVideo | null> => {
    return VideoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true }).exec();
}

const searchVideos = async (query: string): Promise<IVideo[]> => {
    const regex = new RegExp(query, 'i');
    return VideoModel.find({ $or: [{ kategori: regex }, { description: regex }] }).exec();
};

const videoRepository = {
    createVideo,
    getAllVideos,
    getVideoById,
    addProductToVideo,
    updateVideoViews,
    likeVideo,
    unlikeVideo,
    searchVideos,
}

export default videoRepository;