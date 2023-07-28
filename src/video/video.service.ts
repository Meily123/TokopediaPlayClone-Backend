import {IVideo, IVideoInput} from './video.interface';
import videoRepository from './video.repository';
import {ProductModel} from "../product/product.model";
import userRepository from "../user/user.repository";
import {AppError} from "../utils/error/AppError";
import {ERROR_CODE} from "../utils/error/errors";
import {IUser} from "../user/user.interface";
import commentRepository from "./comment/comment.repository";
import productRepository from "../product/product.repository";
import {VideoModel} from "./video.model";

const addVideo = async (videoInput: IVideoInput, requestUser: IUser): Promise<IVideo> => {
    const user = await userRepository.findUserByUsername(requestUser.username);
    if (!user) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    videoInput.createdBy = user.id;
    return videoRepository.createVideo(videoInput);
};

const retrieveAllVideos = async (): Promise<IVideo[]> => {
    return videoRepository.getAllVideos();
};

const retrieveVideoById = async (id: string): Promise<IVideo | null> => {
    const video = await videoRepository.updateVideoViews(id);
    if (!video) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }
    return video;
};

const addProductToVideo = async (videoId: string, productId: string): Promise<IVideo | null> => {
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
        throw new AppError(ERROR_CODE.BAD_REQUEST);
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    if (video.products.includes(product.id)) {
        return video;
    }

    const updatedVideo = videoRepository.addProductToVideo(videoId, product.id);

    if (!updatedVideo) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }
    return updatedVideo;
};

const createCommentForVideo = async (videoId: string, username: string, content: string) => {
    const video = await videoService.retrieveVideoById(videoId);
    // Create the comment and get its ID

    return (await commentRepository.createComment (video.id, username, content));
};

const getProductbyVideoId = async (videoId: string) => {
    const video = await videoService.retrieveVideoById(videoId);
    const productIds = video.products.map((id) => id.toString());
    return await productRepository.getProductsByIds(productIds);
};

const likeVideo = async (videoId: string, username: string) => {
    const user = await userRepository.findUserByUsername(username);

    if (!user) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const video = await VideoModel.findById(videoId);

    if (!video) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    if (video.likes.includes(user.id)) {
        return video;
    }

    return await videoRepository.likeVideo(videoId, user.id);
};

const unlikeVideo = async (videoId: string, username: string) => {
    const user = await userRepository.findUserByUsername(username);

    if (!user) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
        throw new AppError(ERROR_CODE.NOT_FOUND);
    }

    if (!video.likes.includes(user.id)) {
        return video;
    }

    return await videoRepository.unlikeVideo(videoId, user.id);
};

const videoService = {
    addVideo,
    retrieveAllVideos,
    retrieveVideoById,
    addProductToVideo,
    createCommentForVideo,
    getProductbyVideoId,
    likeVideo,
    unlikeVideo,
};

export default videoService;