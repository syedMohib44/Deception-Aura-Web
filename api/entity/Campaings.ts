import { Types, Schema, Document, model } from 'mongoose';
import { IProducts } from './Products';

export interface ICampaings extends Document {
    name: string;
    /**
     * Path where campaing Qr-code is stored probable at server.
     */
    qrCode: string;
    /**
     * Files for integration in our unity-ads could be obj, fbx, .png etc...
     */
    files: {
        _id?: string;
        name: string;
        path: string;
        fileType: string,
        createdAt: Date;
    }[];
    isActive: boolean;
    product: IProducts['_id'];
    createdAt: string;
    updatedAt: string;
}

const adFiles = new Schema({
    name: { type: String },
    path: { type: String },
    fileType: { type: String },
    createdAt: { type: Date }
});

const campaingSchema = new Schema({
    name: { type: String, required: true },
    qrCode: { type: String, required: true },
    product: { type: Types.ObjectId, ref: 'Products' },
    isActive: { type: Boolean, default: false, required: true },
    file: [adFiles]
}, { timestamps: true })

export default model<ICampaings>('Campaings', campaingSchema);