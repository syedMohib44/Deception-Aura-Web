import { IBusinesses } from '../entity/Businesses';

export interface JWTPAYLOAD {
    userId: string;
    username: string;
    profilePic?: string;
    business: IBusinesses;
    typeOfUser: 'customer' | 'owner' | 'superadmin';
    token?: string;
}