import { Router } from 'express';
import { loginUser } from '../controllers/user.controller';
import { ownerRegister } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginUser);
router.post('/register', ownerRegister);

export {
    router as authRoutes
};