import { Request, Response, NextFunction } from 'express';
import { IGetOptionsWithPaginate } from '../interface/IGetOptions';
import { IUserRequest } from '../interface/IUserRequest';
import { IMailOptions } from '../libs/mail/mail';
import { insertProduct } from '../services/product-service/insertProduct.service';
import { showProducts, showProductsById } from '../services/product-service/showProduct.service';

export const postProduct = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        await insertProduct(req.body);
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export interface ShowProductOptionPaginate extends IGetOptionsWithPaginate {
    businessId?: string;
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const options: ShowProductOptionPaginate = {
            select: req.query.select,
            page: +!!req.query.page,
            limit: +!!req.query.limit || 10,
            sort: req.query.sort,
            q: req.query.q as string,
            businessId: req.query.businessId as string
        }
        if (req.query.hasOwnProperty('pagination'))
            options.pagination = +!!req.query.pagination === 1;

        const result = await showProducts(options);
        res.status(200).json({ status: 'success', message: result });
    } catch (err) {
        next(err);
    }
}

export const getProductById = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        const result = await showProductsById(req.user.business._id, req.params.id);
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
}