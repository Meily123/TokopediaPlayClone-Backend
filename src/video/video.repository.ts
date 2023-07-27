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
    return VideoModel.findById(id).exec();
}

const addProductToVideo = async (videoId: string, productId: ObjectId): Promise<IVideo | null> => {
    const video = await VideoModel.findById(videoId).exec();
    if (!video) {
        return null;
    }

    video.products.push(productId);
    return video.save();
}

const videoRepository = {
    createVideo,
    getAllVideos,
    getVideoById,
    addProductToVideo,
}

export default videoRepository;