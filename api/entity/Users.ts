import { Schema, model, Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IBusinesses } from './Businesses';

export const typeOfUsers = ['owner'] as const;
export type typeOfUser = typeof typeOfUsers[number];

export interface IUsers extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    isActive: boolean;
    typeOfUser: typeOfUser;
    phone: string;
    business: IBusinesses;
    lastLogin: string;
    profilePic?: string;
    gravatar: (size: number) => string;
    fullName: string;
}

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8, maxlength: 255 },
    isActive: { type: Boolean, required: true, default: false },
    typeOfUser: { type: String, enum: typeOfUsers, required: true, trim: true },
    business: { type: Schema.Types.ObjectId, ref: 'Businesses' },
    phone: { type: String, trim: true },
    lastLogin: { type: String, required: false },
    profilePic: { type: String, required: false }
}, { timestamps: true });

UserSchema.plugin(paginate);

UserSchema.methods.gravatar = function (size: number = 200) {
    if(!this.email){
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
}

UserSchema.virtual('fullName').get(function (this: any) {
    return `${this.firstName} ${this.lastName}`;
});

export default model<IUsers>('Users', UserSchema);