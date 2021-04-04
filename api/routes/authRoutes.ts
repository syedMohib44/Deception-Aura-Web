import { Router } from 'express';
import { loginUser, logout } from '../controllers/user.controller';
import { ownerRegister } from '../controllers/auth.controller';
import { userRequestHandler } from '../middlewares/userRequestHandler';
import multer from 'multer';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', userRequestHandler(logout));
router.post('/register', multer({limits:{
    fileSize: 1000 * 1 * 3000
}}).single('profilePic'), ownerRegister);

export {
    router as authRoutes
};