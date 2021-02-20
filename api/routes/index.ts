import { Router } from 'express';
import { auth, superadminAuth, isSuperadmin } from '../middlewares/auth';
import { userRequestHandler } from '../middlewares/userRequestHandler';
import multer from 'multer';
import { authRoutes } from './authRoutes';
import { userRoutes } from './user';

const router = Router();

//router.use('/superadmin', superadminAuth(), isSuperadmin, superadminRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export {
    router as apiRoutes
};
