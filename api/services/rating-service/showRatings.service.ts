import Ratings from "../../entity/Ratings"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";

export const showRatings = async (productId: string, options: IGetOptionsWithPaginate) => {
    const query = {
        product: productId
    }

    if (options.q) {
        const usersCount = await Ratings.countDocuments({ $text: { $search: options.q } });
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
                    { username: re },
                    { comment: re }
                ]
            });
        }
    }
    const ratings = await Ratings.paginate({ prodcut: productId });
    return ratings;
}