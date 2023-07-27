// src/comment/comment.repository.ts
import { CommentModel, IComment } from './comment.model';
import {ObjectId} from "mongoose";

const createComment = async (videoId: ObjectId, username: string, content: string): Promise<IComment> => {

    const comment = new CommentModel({
        videoId,
        username,
        content,
    });
    return comment.save();
};

const commentRepository = {
    createComment,
};

export default commentRepository;