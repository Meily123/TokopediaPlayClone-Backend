// src/video/video.controller.ts
import { Request, Response, NextFunction } from 'express';
import { IVideoInput } from './video.interface';
import videoService from './video.service';
import userRepository from '../user/user.repository';
import { AppError } from '../utils/error/AppError';
import { ERROR_CODE } from '../utils/error/errors';
import commentRepository from './comment/comment.repository';
import videoRepository from './video.repository';

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
        res.status(201).json(video);
    } catch (error) {
        next(error);
    }
}

// @ts-ignore
const getAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const videos = await videoService.retrieveAllVideos();
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

const getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const video = await videoService.retrieveVideoById(id);

        if (!video) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video not found');
        }

        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
}

const addProductToVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId, productId } = req.params;
        const updatedVideo = await videoService.addProductToVideo(videoId, productId);

        if (!updatedVideo) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video or Product not found');
        }

        res.status(200).json(updatedVideo);
    } catch (error) {
        next(error);
    }
}

const createCommentForVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { videoId } = req.params;
        const { content } = req.body;

        const video = await videoService.retrieveVideoById(videoId);

        // Create the comment and get its ID
        const comment = await commentRepository.createComment(video.id, req.user.username, content);
        const commentId = comment.id;

        // Add the comment to the video
        const updatedVideo = await videoRepository.addCommentToVideo(video.id, commentId);

        if (!updatedVideo) {
            throw new AppError(ERROR_CODE.NOT_FOUND, 'Video or Comment not found');
        }

        res.status(200).json(updatedVideo);
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
}

export default videoController;