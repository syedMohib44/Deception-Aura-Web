import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { JWTPAYLOAD } from '../interface/JWTPayload';
import { config } from '../config';


export const auth = () => (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
};

export const superadminAuth = () => (req: Request, res: Response, next: NextFunction) => {
     //Checks if superadmin is going to signup or login on already loggedin if not othe the routes are there then its a false route
    if (isSuperadminPathAllowed(req.originalUrl)) {
        return next();
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
};

export const isSuperadmin = (req: Request, res: Response, next: NextFunction) => {
    if (isSuperadminPathAllowed(req.originalUrl)) {
        return next();
    }

    const payload = req.user as JWTPAYLOAD;
    if (payload.typeOfUser === 'superadmin') {
        return next();
    }
    res.sendStatus(401);
};

const isSuperadminPathAllowed = (url: string) => {
    const allowedRoutes = ['login', 'signup', 'token'];
    return allowedRoutes.some(r => url.endsWith(r));
};
