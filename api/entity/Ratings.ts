import { Schema, Document, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IProducts } from './Products';

export interface IRatings extends Document {
    name: string | 'Anonymous';
    username?: string;
    product: IProducts['_id'];
    /**
     * 5 star or 4 star rating
     */
    stars: string;
    /**
     * Feedback with rating
     */
    comment?: string;
}

const RatingSchema = new Schema({
    name: { type: String, required: true, default: 'Anonymous' },
    username: { type: String, required: false },
    product: { type: Types.ObjectId, ref: 'Products', required: true },
    star: { type: String, required: true, default: '0' },
    comment: { type: String, required: false }
});

RatingSchema.plugin(mongoosePaginate);

export default model<IRatings>('Ratings', RatingSchema);