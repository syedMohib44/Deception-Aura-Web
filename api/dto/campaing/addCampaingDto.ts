import { IProducts } from "../../entity/Products";

export interface AddCampaingDto {
    name: string;
    qrCode: string;
    product: IProducts['_id'];
    isActive: boolean;
    files: Express.Multer.File[];
}