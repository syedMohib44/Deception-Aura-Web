import { config } from "../../config";
import { UpdateProfileDto, UpdateUserDto } from "../../dto/business/updateBusinessDto";
import Users, { IUsers } from "../../entity/Users"
import { APIError } from "../../utils/error";


const updateUserPhone = async (user: IUsers, data: UpdateUserDto) => {
    user.phone = data.phone || user.phone;
    user.profilePic = data.profilePic?.replace(config.base_url, '') || user.profilePic;

    await user.save();
};

export const updateProfile = async (_id: string, profile: UpdateProfileDto) => {
    const user = await Users.findOne({ _id });
    if (!user)
        throw new APIError(404, { message: 'User cannot be updated' });
    if (profile.hoursOfOperations?.length && profile.hoursOfOperations?.length > 7)
        throw new APIError(401, { message: 'Hours of operatons cannot be more than 7 days' });

    await Promise.all([
        updateUserPhone(user as IUsers, profile)
    ]);
}