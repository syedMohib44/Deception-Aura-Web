import { Router } from 'express';
import { loginUser, logout } from '../controllers/user.controller';
import { ownerRegister } from '../controllers/auth.controller';
import { userRequestHandler } from '../middlewares/userRequestHandler';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', userRequestHandler(logout));
router.post('/register', ownerRegister);

export {
    router as authRoutes
};