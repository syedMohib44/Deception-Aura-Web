import { IProducts } from "../../entity/Products";

export interface AddCampaingDto {
    name: string;
    qrCode: string;
    product: IProducts['_id'];
    isActive: boolean;
    files: {
        [field: string]: Express.Multer.File[];
    }
}