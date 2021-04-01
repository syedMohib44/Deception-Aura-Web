import { Types } from "mongoose";
import { ShowRatingOptionsPaginate } from "../../controllers/rating.controller";
import { IProducts } from "../../entity/Products";
import Ratings from "../../entity/Ratings"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";
import { APIError } from "../../utils/error";

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


export const showCalculatedRating = async (productId: IProducts['_id']) => {
    console.log(productId);
    const aggregate = [
        { $match: { product: Types.ObjectId(productId) } },
        {
            $group: {
                _id: { product: '$product' },
                totalRatings: { $avg: '$stars' },
                count: { $sum: 1 }
            }
        }];
    const rating = await Ratings.aggregate(aggregate);
    return rating[0];
}