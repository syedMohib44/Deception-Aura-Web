import Campaings from "../../entity/Campaings"
import { APIError } from "../../utils/error";

export const showCampaingById = async (_id: string) => {
    const campaing = await Campaings.findOne({ _id });
    if (!campaing)
        throw new APIError(404, { message: 'Camaping not found' });

    return campaing;
}

export const showCamapings = async (productId: string) => {
    const campaings = await Campaings.find({ product: productId });
    if (!campaings)
        throw new APIError(404, { message: "No campaing found for this product" });

    return campaings;
}

