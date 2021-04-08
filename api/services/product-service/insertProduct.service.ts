import { AddProductDto } from "../../dto/product/addProductDto";
import Products from "../../entity/Products";
import { APIError } from "../../utils/error";

export const insertProduct = async (addProductDto: AddProductDto) => {
    //TODO: Need to put validation for unique product name can be added.
    if (!addProductDto)
        throw new APIError(400, { message: 'Mendatory fields are empty' });

    const product = new Products();
    product.name = addProductDto.name;
    product.price = addProductDto.price;
    if (addProductDto.productPic)
        product.productPic = addProductDto.businessName + '/' + addProductDto.productPic.originalname;
    product.business = addProductDto.business;
    await product.save();
}