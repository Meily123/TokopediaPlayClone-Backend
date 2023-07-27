// src/comment/comment.repository.ts
import { CommentModel, IComment } from './comment.model';
import {ObjectId} from "mongoose";

export async function createComment(videoId: ObjectId, username: string, content: string): Promise<IComment> {

    const comment = new CommentModel({
        videoId,
        username,
        content,
    });
    return comment.save();
}
