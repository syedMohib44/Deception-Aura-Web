import { ICampaings } from "../../entity/Campaings";
import { IProducts } from "../../entity/Products";

export interface UpdateCampaingDto {
    _id: ICampaings['_id'];
    businessName: string;
    name?: string;
    qrCode?: string;
    product?: IProducts['_id'];
    isActive?: boolean;
    files?: Express.Multer.File[];
}