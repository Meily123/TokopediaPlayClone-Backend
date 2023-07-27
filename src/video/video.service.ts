import { IVideoInput, IVideo } from './video.interface';
import videoRepository from './video.repository';
import {ProductModel} from "../product/product.model";

const addVideo = async (videoInput: IVideoInput): Promise<IVideo> => {
    return videoRepository.createVideo(videoInput);
};

const retrieveAllVideos = async (): Promise<IVideo[]> => {
    return videoRepository.getAllVideos();
};

const retrieveVideoById = async (id: string): Promise<IVideo | null> => {
    return videoRepository.getVideoById(id);
};

const addProductToVideo = async (videoId: string, productId: string): Promise<IVideo | null> => {
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
        return null;
    }

    return videoRepository.addProductToVideo(videoId, product.id);
};

const videoService = {
    addVideo,
    retrieveAllVideos,
    retrieveVideoById,
    addProductToVideo
};

export default videoService;