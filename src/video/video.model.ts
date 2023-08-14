import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IVideo } from './video.interface';

export type VideosDocument = IVideo & Document;

const videoSchema = new Schema<VideosDocument>({
    likes: [{ type: Types.ObjectId, ref: 'users' }],
    thumbnailUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Types.ObjectId, required: true, ref: 'users' },
    videoUrl: { type: String, required: true },
    products: [{ type: Types.ObjectId, ref: 'Product' }],
});

export const VideoModel: Model<VideosDocument> = mongoose.model('videos', videoSchema);
