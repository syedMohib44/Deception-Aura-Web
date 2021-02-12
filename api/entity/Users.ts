import { Schema, model, Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IBusinesses } from './Businesses';

export const typeOfUsers = ['superAdmin', 'owner'] as const;
export type typeOfUser = typeof typeOfUsers[number];

export interface IUsers extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    typeOfUser: typeOfUser;
    phone: string;
    business: IBusinesses;
    lastLogin: string;
    profilePic: string;
    fullName: string;
}

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8, maxlength: 255 },
    typeOfUser: { type: String, enum: typeOfUsers, required: true, trim: true },
    business: { type: Schema.Types.ObjectId, ref: 'Businesses' },
    phone: { type: String, trim: true },
    lastLogin: { type: String, required: false },
    profilePic: { type: String, required: false },
    blacklistedMenus: [{ type: String }],
}, { timestamps: true });

UserSchema.plugin(paginate);

UserSchema.virtual('fullName').get(function (this: any) {
    return `${this.firstName} ${this.lastName}`;
});

export default model<IUsers>('Users', UserSchema);