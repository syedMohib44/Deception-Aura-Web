import { Request, Response, NextFunction } from 'express';
import { insertUserAsOwner } from '../services/auth-service/register.service';

export const ownerRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        await insertUserAsOwner({...req.body, profilePic: req.file});
        res.status(201).json({message: 'registration successful'});
    } catch (err) {
        next(err);
    }
};

// export const activateAccount = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await ActivateUser(req.params.username);
//         res.status(200).send('Account has been re-activated successfully');
//     } catch (err) {
//         next(err);
//     }
// };
