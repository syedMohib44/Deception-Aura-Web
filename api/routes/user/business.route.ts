import { Router } from 'express';
import { getBusinesses } from '../../controllers/business.controller';

const router = Router();

router.get('/', getBusinesses);

export {
    router as businessRoutes
}