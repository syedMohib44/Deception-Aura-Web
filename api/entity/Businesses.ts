import { Schema, Document, model, Model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IBusinesses extends Document {
    _id: any;
    name: string;
    isActive?: boolean;
    logo?: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}

const BusinessesSchema = new Schema({
    name: { type: String, unique: true, functionfunctionrequired: true, trim: true },
    isActive: { type: Boolean, default: true, required: false },
    logo: { type: String, required: false },
    type: { type: String, required: false },
}, { timestamps: true });

BusinessesSchema.plugin(paginate);

export default model<IBusinesses>('Businesses', BusinessesSchema);
