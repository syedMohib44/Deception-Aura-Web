import { Router } from 'express';
import { getProductById, getProducts, postProduct, putProduct } from '../../controllers/product.controller';
import { userRequestHandler } from '../../middlewares/userRequestHandler';

const router = Router();

router.get('/', getProducts);
router.post('/', userRequestHandler(postProduct));
router.put('/', userRequestHandler(putProduct));
router.get('/:id', userRequestHandler(getProductById));

export {
    router as productRoutes
}