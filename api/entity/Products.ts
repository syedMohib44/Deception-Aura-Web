import { Types, Document, model, Schema } from 'mongoose';
import { IBusinesses } from './Businesses';
const paginate = require('mongoose-paginate-v2');


export interface IProducts extends Document {
    _id: any;
    name: string;
    price: string;
    /**
     * Rating of product with comments/reviews.
     */
    ratings: {
        rating: string,
        comment?: string
    }[];
    business: IBusinesses['_id'];
}

const ratingSchema = new Schema({
    rating: { type: String, required: true },
    comment: { type: String, required: false }
})

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    business: { type: Types.ObjectId, ref: 'Businesses' },
    ratings: [ratingSchema]
});
productSchema.plugin(paginate);

export default model<IProducts>('Products', productSchema);