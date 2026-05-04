import { Router } from 'express';
import { OffersController } from './offers.controller.js';
import { requireAuth } from '../../shared/middlewares/auth.js';

const router = Router();
const offersController = new OffersController();

router.post('/', requireAuth, offersController.createOffer);
router.post('/:offerId/counter', requireAuth, offersController.counterOffer);
router.post('/:offerId/accept', requireAuth, offersController.acceptOffer);
router.post('/:offerId/reject', requireAuth, offersController.rejectOffer);

export { router as offerRoutes };
