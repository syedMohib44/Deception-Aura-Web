import Products from "../../entity/Products"
import { APIError } from "../../utils/error";

export const showProducts = async (businessId: string) => {
    const products = await Products.find({ business: businessId });

    if (!products)
        throw new APIError(404, { message: 'No product found for the business' });

    return products;
}

export const showProductsById = async (businessId: string, productId: string) => {
    const product = await Products.find({ _id: productId, business: businessId });

    if (!product)
        throw new APIError(404, { message: 'This product cannot be found' });

    return product;
}