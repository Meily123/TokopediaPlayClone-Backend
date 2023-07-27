import { CommentModel, IComment } from './comment.model';
import mongoose, {ObjectId} from "mongoose";

const createComment = async (videoId: ObjectId, username: string, content: string): Promise<IComment> => {

    const comment = new CommentModel({
        videoId,
        username,
        content,
    });
    return comment.save();
};

const getCommentsByVideoId = async (videoId: string): Promise<IComment[]> => {
    return CommentModel.find({ videoId: new mongoose.Types.ObjectId(videoId) }).exec();
}

const commentRepository = {
    createComment,
    getCommentsByVideoId
};

export default commentRepository;