import { Router } from 'express';
import { auth, superadminAuth, isSuperadmin } from '../middlewares/auth';
import { userRequestHandler } from '../middlewares/userRequestHandler';
import multer from 'multer';
import { authRoutes } from './authRoutes';

const router = Router();

//router.use('/superadmin', superadminAuth(), isSuperadmin, superadminRoutes);
router.use('/auth', authRoutes);

export {
    router as apiRoutes
};
