import { Router } from 'express';
import { getProductById, getProducts, postProduct, putProduct } from '../../controllers/product.controller';
import { userRequestHandler } from '../../middlewares/userRequestHandler';

const router = Router();

router.get('/', getProducts);
router.get('/:id', userRequestHandler(getProductById));
router.post('/', userRequestHandler(postProduct));
router.put('/', userRequestHandler(putProduct));

export {
    router as productRoutes
}