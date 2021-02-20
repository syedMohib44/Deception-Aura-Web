import { UpdateProductDto } from "../../dto/product/updateProductDto";
import Products from "../../entity/Products";
import { APIError } from "../../utils/error";

export const updateProduct = async (updateProductDto: UpdateProductDto) =>
 await Products.findOneAndUpdate({ _id: updateProductDto.product },
    { price: updateProductDto.price, name: updateProductDto.name });