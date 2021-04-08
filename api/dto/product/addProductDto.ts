import { IBusinesses } from "../../entity/Businesses";

export interface AddProductDto {
    name: string;
    price: string;
    productPic?: Express.Multer.File;
    businessName: string;
    business: IBusinesses['_id'];
}