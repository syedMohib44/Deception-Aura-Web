import { AddProductDto } from "../../dto/product/addProductDto";
import Products from "../../entity/Products";
import { APIError } from "../../utils/error";

export const insertProduct = async (addProductDto: AddProductDto) => {
    if (!addProductDto)
        throw new APIError(400, { message: 'Mendatory fields are empty' });
    
    const product = new Products();
    product.name = addProductDto.name;
    product.price = addProductDto.price;
    product.business = addProductDto.business;
    await product.save();
}