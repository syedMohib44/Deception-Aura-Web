import { Router } from 'express';
import { auth, superadminAuth, isSuperadmin } from '../middlewares/auth';
import { userRequestHandler } from '../middlewares/userRequestHandler';
import multer from 'multer';
import { authRoutes } from './authRoutes';
import { userRoutes } from './user';
import { superadminRoutes } from './superadmin';

const router = Router();

router.use('/superadmin', superadminAuth(), isSuperadmin, superadminRoutes);
router.use('/auth', authRoutes);
router.use('/user', auth(), userRoutes);

export {
    router as apiRoutes
};
