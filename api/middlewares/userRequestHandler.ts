import { Request, Response, NextFunction } from 'express';
import { IUserRequest } from '../interface/IUserRequest';

type userRequestCallback = (userReq: IUserRequest, res: Response, next: NextFunction) => any | Promise<any>;

export const userRequestHandler = (handler: userRequestCallback) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userReq: IUserRequest = req as IUserRequest;
            await handler(userReq, res, next);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
}