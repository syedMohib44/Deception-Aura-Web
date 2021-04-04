import { Router } from 'express';
import { getCampaings, postCampaing, putCamaping } from '../../controllers/campaing.controller';
import { userRequestHandler } from '../../middlewares/userRequestHandler';
import multer from 'multer';

const router = Router();

router.get('/', userRequestHandler(getCampaings));
router.post('/', multer({
    limits: {
        fileSize: 1000 * 1 * 3000
    }
}).fields([
    { name: 'models', maxCount: 5 },
    { name: 'textures', maxCount: 5 },
    { name: 'images', maxCount: 5 },
    { name: 'misc', maxCount: 5 }
]), userRequestHandler(postCampaing));
router.put('/', userRequestHandler(putCamaping));

export {
    router as campaingRoutes
}