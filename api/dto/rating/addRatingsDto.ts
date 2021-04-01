import { IBusinesses } from "../../entity/Businesses";
import { IProducts } from "../../entity/Products";

export interface AddRatingsDto {
    name: string;
    username?: string;
    product: IProducts['id'];
    productName: IProducts['name'];
    business: IBusinesses['_id'];
    /**
     * 5 star or 4 star rating
     */
    stars: number;
    /**
     * Feedback with rating
     */
    comment?: string;
}