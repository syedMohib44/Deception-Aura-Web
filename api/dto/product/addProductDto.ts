import { IBusinesses } from "../../entity/Businesses";

export interface AddProductDto {
    name: string;
    price: string;
    business: IBusinesses['_id'];
}