import { IProducts } from "../../entity/Products";

export interface UpdateProductDto {
    name?: string;
    price?: string;
    product: IProducts['_id'];
}