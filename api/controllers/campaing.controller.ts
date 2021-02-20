import { Request, Response, NextFunction } from 'express';
import { IProducts } from '../entity/Products';
import { IGetOptionsWithPaginate } from '../interface/IGetOptions';
import { IUserRequest } from '../interface/IUserRequest';
import { insertCampaing } from '../services/campaing-service/insertCampaing.service';
import { showCamapings, showCampaingById } from '../services/campaing-service/showCampaing.service';
import { updateCampaing } from '../services/campaing-service/updateCampaing.service';

export const postCampaing = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        await insertCampaing(req.body);
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export interface ShowCamapingOptionPaginate extends IGetOptionsWithPaginate {
    productId?: IProducts['_id'];
}

export const getCampaings = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        const options: ShowCamapingOptionPaginate = {
            select: req.query.select,
            page: +!!req.query.page,
            limit: +!!req.query.limit || 10,
            sort: req.query.sort,
            search: req.query,
            q: req.query.q as string,
            productId: req.query.businessId as string
        }
        const result = await showCamapings(options)
        res.status(200).json({ status: 'success', data: result })
    } catch (err) {
        next(err);
    }
}

export const getCamapingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = showCampaingById(req.params.id);
        res.status(200).json({ status: 'success', data: result });
    } catch (err) {
        next(err);
    }
}


export const putCamaping = async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        await updateCampaing(req.body);
        res.status(200).json({ status: 'success', data: 'Camapaing updated successfylly' });
    } catch (err) {
        next(err);
    }
}