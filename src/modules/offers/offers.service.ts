import { OffersRepository } from './offers.repository.js';
import { z } from 'zod';
import { createOfferSchema, counterOfferSchema } from './offers.validation.js';
import { NotFoundError, ForbiddenError, ValidationError } from '../../shared/exceptions/AppError.js';
import { eventBus } from '../../infrastructure/events/index.js';

export class OffersService {
  private offersRepo = new OffersRepository();

  async createOffer(senderId: string, data: z.infer<typeof createOfferSchema>) {
    const offer = await this.offersRepo.createOffer({
      senderId,
      receiverId: data.receiverId,
      chatRoomId: data.chatRoomId,
      price: data.price,
      quantity: data.quantity,
    });

    eventBus.emit('offer.created', { offer });
    return offer;
  }

  async counterOffer(senderId: string, parentOfferId: string, data: z.infer<typeof counterOfferSchema>) {
    const parentOffer = await this.offersRepo.getOfferById(parentOfferId);
    
    if (!parentOffer) throw new NotFoundError('Parent offer not found');
    if (parentOffer.status !== 'PENDING') throw new ValidationError('Can only counter PENDING offers');
    if (parentOffer.receiverId !== senderId) throw new ForbiddenError('Only the receiver can counter this offer');

    const newOffer = await this.offersRepo.createCounterOffer(parentOfferId, {
      senderId,
      receiverId: parentOffer.senderId, // swap roles
      chatRoomId: parentOffer.chatRoomId,
      price: data.price,
      quantity: data.quantity,
    });

    eventBus.emit('offer.countered', { parentOfferId, newOffer });
    return newOffer;
  }

  async acceptOffer(userId: string, offerId: string) {
    const offer = await this.offersRepo.getOfferById(offerId);
    
    if (!offer) throw new NotFoundError('Offer not found');
    if (offer.status !== 'PENDING') throw new ValidationError('Can only accept PENDING offers');
    if (offer.receiverId !== userId) throw new ForbiddenError('Only the receiver can accept this offer');

    const acceptedOffer = await this.offersRepo.updateOfferStatus(offerId, 'ACCEPTED');

    // Emitting offer.accepted will trigger the Order creation process in the Orders Module
    eventBus.emit('offer.accepted', { offer: acceptedOffer });
    return acceptedOffer;
  }

  async rejectOffer(userId: string, offerId: string) {
    const offer = await this.offersRepo.getOfferById(offerId);
    
    if (!offer) throw new NotFoundError('Offer not found');
    if (offer.status !== 'PENDING') throw new ValidationError('Can only reject PENDING offers');
    if (offer.receiverId !== userId) throw new ForbiddenError('Only the receiver can reject this offer');

    const rejectedOffer = await this.offersRepo.updateOfferStatus(offerId, 'REJECTED');
    return rejectedOffer;
  }
}
