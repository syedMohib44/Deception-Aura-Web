import Products from "../../entity/Products"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";
import { APIError } from "../../utils/error";



export const showProducts = async (businessId: string, options: IGetOptionsWithPaginate) => {

    //const products = await Products.find({ business: businessId });

    const query = {
        business: businessId
    };

    if (options.q) {
        const usersCount = await Products.countDocuments({ $text: { $search: options.q } });
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
    const products = await Products.paginate(query, options);
    // if (!products.docs)
    //     throw new APIError(404, { message: 'No product found for the business' });

    return products;
}

export const showProductsById = async (businessId: string, productId: string) => {
    const product = await Products.find({ _id: productId, business: businessId });

    if (!product)
        throw new APIError(404, { message: 'This product cannot be found' });

    return product;
}