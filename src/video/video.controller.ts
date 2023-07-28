import { Request, Response, NextFunction } from 'express';
import { IVideoInput } from './video.interface';
import videoService from './video.service';
import commentRepository from './comment/comment.repository';
import {AppError} from "../utils/error/AppError";
import {ERROR_CODE} from "../utils/error/errors";


const createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videoInput: IVideoInput = req.body;
        const video = await videoService.addVideo(videoInput, req.user);
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
        const video = await videoService.retrieveVideoById(id);
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
        res.status(200).json({data: updatedVideo});
    } catch (error) {
        next(error);
    }
};

const createCommentForVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const { content } = req.body;
        const comment = await videoService.createCommentForVideo(videoId, req.user.username, content);
        res.status(201).json({data:comment});
    } catch (error) {
        next(error);
    }
};

const getCommentsForVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const comments = await commentRepository.getCommentsByVideoId(videoId);
        res.status(200).json({data: comments});
    } catch (error) {
        next(error);
    }
};

const getProductsByVideoId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const products = await videoService.getProductbyVideoId(videoId);
        res.status(200).json({ data: products });
    } catch (error) {
        next(error);
    }
};

 const likeVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;

        await videoService.likeVideo(videoId, req.user.username);

        res.status(200).json({ message: 'Video liked successfully' });
    } catch (error) {
        next(error);
    }
};

const unlikeVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;

        await videoService.unlikeVideo(videoId, req.user.username);

        res.status(200).json({ message: 'Video unliked successfully' });
    } catch (error) {
        next(error);
    }
};

const searchVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query } = req.query;
        console.log(query);
        if (!query || typeof query !== 'string') {
            throw new AppError(ERROR_CODE.BAD_REQUEST);
        }

        const videos = await videoService.searchVideos(query.toString()); // Ensure the query is a string
        console.log(videos);
        res.status(200).json({ data: videos });
    } catch (error) {
        next(error);
    }
};

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
    searchVideo,
};

export default videoController;