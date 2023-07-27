import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    videoId: mongoose.Types.ObjectId;
    username: string;
    content: string;
}

const commentSchema: Schema = new Schema({
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
});

export const CommentModel = mongoose.model<IComment>('Comment', commentSchema);
