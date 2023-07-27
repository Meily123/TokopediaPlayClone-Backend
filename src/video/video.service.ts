import { IVideoInput, IVideo } from './video.interface';
import videoRepository from './video.repository';
import {ProductModel} from "../product/product.model";
import userRepository from "../user/user.repository";
import {AppError} from "../utils/error/AppError";
import {ERROR_CODE} from "../utils/error/errors";
import {IUser} from "../user/user.interface";

const addVideo = async (videoInput: IVideoInput, requestUser: IUser): Promise<IVideo> => {
    const user = await userRepository.findUserByUsername(requestUser.username);
    if (!user) {
        throw new AppError(ERROR_CODE.NOT_FOUND, 'User not found');
    }

    videoInput.createdBy = user.id;
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