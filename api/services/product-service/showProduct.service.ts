import { ShowProductOptionPaginate } from "../../controllers/product.controller";
import Products from "../../entity/Products"
import { IGetOptionsWithPaginate } from "../../interface/IGetOptions";
import { APIError } from "../../utils/error";



export const showProducts = async (options: ShowProductOptionPaginate) => {
    const query = {
    };

    if (options.businessId)
        Object.assign(query, { business: options.businessId });

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
    return products;
}

export const showProductsById = async (businessId: string, productId: string) => {
    const product = await Products.find({ _id: productId, business: businessId });

    if (!product)
        throw new APIError(404, { message: 'This product cannot be found' });

    return product;
}