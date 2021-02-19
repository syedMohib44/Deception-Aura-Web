import { ShowRatingOptionsPaginate } from "../../controllers/rating.controller";
import Ratings from "../../entity/Ratings"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";

export const showRatings = async (options: ShowRatingOptionsPaginate) => {
    const query = {
    }

    if (options.productId) {
        Object.assign(query, { product: options.productId })
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
    const ratings = await Ratings.paginate(query, options);
    return ratings;
}