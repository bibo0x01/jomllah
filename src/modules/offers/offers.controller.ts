import { Request, Response, NextFunction } from 'express';
import { OffersService } from './offers.service.js';
import { createOfferSchema, counterOfferSchema } from './offers.validation.js';


export class OffersController {
  private offersService = new OffersService();

  createOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createOfferSchema.parse(req.body);
      const offer = await this.offersService.createOffer(req.user!.userId, validatedData);
      res.status(201).json({ status: 'success', data: offer });
    } catch (error) {
      next(error);
    }
  };

  counterOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offerId } = req.params;
      const validatedData = counterOfferSchema.parse(req.body);
      const newOffer = await this.offersService.counterOffer(req.user!.userId, offerId, validatedData);
      res.status(201).json({ status: 'success', data: newOffer });
    } catch (error) {
      next(error);
    }
  };

  acceptOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offerId } = req.params;
      const acceptedOffer = await this.offersService.acceptOffer(req.user!.userId, offerId);
      res.status(200).json({ status: 'success', data: acceptedOffer });
    } catch (error) {
      next(error);
    }
  };

  rejectOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offerId } = req.params;
      const rejectedOffer = await this.offersService.rejectOffer(req.user!.userId, offerId);
      res.status(200).json({ status: 'success', data: rejectedOffer });
    } catch (error) {
      next(error);
    }
  };
}
