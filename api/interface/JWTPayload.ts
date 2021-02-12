import { IBusinesses } from '../entity/Businesses';

export interface JWTPAYLOAD {
    userId: string;
    username: string;
    business: IBusinesses;
    typeOfUser: 'customer' | 'owner' | 'superadmin';
    token?: string;
}