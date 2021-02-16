import Businesses from "../../entity/Businesses"
import { APIError } from "../../utils/error";

export const showBusinessById = async (_id: string) => {
    const business = await Businesses.findOne({ _id });

    if (!business)
        throw new APIError(404, { message: 'Business not found' });

    return business;
}

export const showAllBusinesses = async () => {
    const businesses = await Businesses.find();

    if (!businesses)
        throw new APIError(404, { message: 'There is no business at the moment' });
    
    return businesses;
}