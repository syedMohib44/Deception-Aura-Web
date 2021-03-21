import { Router } from 'express';
import { campaingRoutes } from './campaing.route';
import { productRoutes } from './product.route';

const router = Router();

router.use('/product', productRoutes);
router.use('/campaing', campaingRoutes);

export {
    router as userRoutes
}