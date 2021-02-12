import { IPricings } from '../../entity/Pricings';
import { IModules } from '../../entity/Modules';
import { IPropProduct } from '../../entity/SuperAdminProps';

export interface AddOwnerDto {
    firstName: string;
    lastName: string;
    username: string;
    businessName: string;
    pricingPlan: IPricings['_id'];
    modules: IModules['_id'][];
    isDemoAccount?: boolean;
    promocode?: {
        code: string;
        setupFee: number;
        monthlyPrice: number;
    };
    productsPurchased: IPropProduct['_id'][];
}

export interface AddOwnerWithCardDto extends AddOwnerDto {
    card: {
        number: string;
        /**
         * Format: MMYYYY, Example: 022020
         */
        expiry: string;
        security_code: string;
        // name?: string;
    };
}
