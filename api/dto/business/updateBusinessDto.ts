import { IAddress } from "../../entity/Address";
import { IBusinessHours } from "../../entity/Businesses";

export interface UpdateBusinessDto {
    name?: string;
    timezone?: string;
    address?: IAddress;
    logo?: Express.Multer.File;
    avatar?: string;
    type?: string;
    hoursOfOperations?: IBusinessHours[];
}

export interface UpdateUserDto {
    phone?: string;
    profilePic?: string;
}

export interface UpdateProfileDto extends UpdateBusinessDto, UpdateUserDto {
}
