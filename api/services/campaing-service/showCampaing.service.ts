import Campaings from "../../entity/Campaings"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";
import { APIError } from "../../utils/error";

export const showCampaingById = async (_id: string) => {
    const campaing = await Campaings.findOne({ _id });
    if (!campaing)
        throw new APIError(404, { message: 'Camaping not found' });

    return campaing;
}

export const showCamapings = async (productId: string, options: IGetOptionsWithPaginate) => {
    //const campaings = await Campaings.find({ product: productId });
    
    const query = {
        product: productId
    };

    if (options.q) {
        const usersCount = await Campaings.countDocuments({ $text: { $search: options.q } });
        if (usersCount !== 0) { // non-partial matched
            Object.assign(query, {
                $text: {
                    $search: options.q,
                    $caseSensitive: false
                }
            });
        } else { // check partial matched
            const re = new RegExp(options.q, 'i');

            Object.assign(query, {
                $or: [
                    { name: re }
                ]
            });
        }
    }

    const campaings = await Campaings.paginate(query, options); 
    // if (!campaings)
    //     throw new APIError(404, { message: "No campaing found for this product" });
    return campaings;
}

