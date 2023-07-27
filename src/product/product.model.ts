import mongoose, {Schema} from 'mongoose';

const productSchema = new mongoose.Schema({
    productUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    imageUrl: { type: String, required: true },
});

export const ProductModel = mongoose.model('Product', productSchema);
