import { Types, Document, model, Schema } from 'mongoose';
import { IBusinesses } from './Businesses';
import { IRatings } from './Ratings';
const paginate = require('mongoose-paginate-v2');


export interface IProducts extends Document {
    name: string;
    price: string;
    /**
     * Rating of product with comments/reviews.
     */
    ratings: IRatings['_id'][];
    business: IBusinesses['_id'];
}

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    business: { type: Types.ObjectId, ref: 'Businesses' },
    ratings: [{type: Types.ObjectId, ref: 'Ratings'}]
});
productSchema.plugin(paginate);

export default model<IProducts>('Products', productSchema);