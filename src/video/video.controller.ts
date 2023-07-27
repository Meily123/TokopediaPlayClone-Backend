import { Request, Response, NextFunction } from 'express';
import { IVideoInput } from './video.interface';
import videoService from './video.service';
import userRepository from '../user/user.repository';
import { AppError } from '../utils/error/AppError';
import { ERROR_CODE } from '../utils/error/errors';
import commentRepository from './comment/comment.repository';
import productRepository from "../product/product.repository";
import videoRepository from "./video.repository";
import {VideoModel} from "./video.model";

const createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videoInput: IVideoInput = req.body;
        const userReq = req.user;
        const user = await userRepository.findUserByUsername(userReq.username);

        if (!user) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'User not found');
        }

        videoInput.createdBy = user.id;
        const video = await videoService.addVideo(videoInput);
        res.status(201).json({data: video});
    } catch (error) {
        next(error);
    }
};

// @ts-ignore
const getAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videos = await videoService.retrieveAllVideos();
        res.status(200).json({data: videos});
    } catch (error) {
        next(error);
    }
};

const getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        await videoRepository.updateVideoViews(id);

        const video = await videoService.retrieveVideoById(id);

        if (!video) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video not found');
        }

        res.status(200).json({data: video});
    } catch (error) {
        next(error);
    }
};

const addProductToVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const { productId } = req.body;
        const updatedVideo = await videoService.addProductToVideo(videoId, productId);

        if (!updatedVideo) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video or Product not found');
        }

        res.status(200).json({data: updatedVideo});
    } catch (error) {
        next(error);
    }
};

const createCommentForVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const { content } = req.body;

        const video = await videoService.retrieveVideoById(videoId);
        // Create the comment and get its ID
        const comment = await commentRepository.createComment(video.id, req.user.username, content);
        res.status(201).json({data:comment});
    } catch (error) {
        next(error);
    }
};

const getCommentsForVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;

        // Get comments by video ID
        const comments = await commentRepository.getCommentsByVideoId(videoId);

        // Handle the scenario where no comments are found
        if (comments.length === 0) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'No comments found for the video');
        }

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export async function getProductsByVideoId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { videoId} = req.params;
        const video = await videoService.retrieveVideoById(videoId);

        // Get products by the list of product IDs
        const productIds = video.products.map((id) => id.toString());
        const products = await productRepository.getProductsByIds(productIds);

        res.status(200).json({ data: products });
    } catch (error) {
        next(error);
    }
}

 const likeVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videoId = req.params.id;

        const user = await userRepository.findUserByUsername(req.user.username);

        if (!user) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'User not found');
        }

        const video = await VideoModel.findById(videoId);

        if (!video) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video not found');
        }

        if (video.likes.includes(user.id)) {
            throw new AppError(ERROR_CODE.BAD_REQUEST, 'User already liked the video');
        }

        video.likes.push(user.id);
        await video.save();

        res.status(200).json({ message: 'Video liked successfully' });
    } catch (error) {
        next(error);
    }
}

const unlikeVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videoId = req.params.id;

        const user = await userRepository.findUserByUsername(req.user.username);

        if (!user) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'User not found');
        }

        const video = await VideoModel.findById(videoId);

        if (!video) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video not found');
        }

        if (!video.likes.includes(user.id)) {
            res.status(200).json({ message: 'Video unliked successfully' });
        }

        video.likes = video.likes.filter((id) => id.toString() !== user.id.toString());
        await video.save();
        res.status(200).json({ message: 'Video unliked successfully' });
    } catch (error) {
        next(error);
    }
}

const videoController = {
    createVideo,
    getAllVideos,
    getVideoById,
    addProductToVideoById,
    createCommentForVideo,
    getCommentsForVideo,
    getProductsByVideoId,
    unlikeVideo,
    likeVideo,
};

export default videoController;