import mongoose, { Document, Model, Schema } from 'mongoose';
import { IVideo } from './video.interface';

export type VideosDocument = IVideo & Document;

const videoSchema = new Schema<VideosDocument>({
    like: { type: Number, default: 0 },
    thumbnailUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    kategori: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    videoUrl: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

export const VideoModel: Model<VideosDocument> = mongoose.model('videos', videoSchema);
