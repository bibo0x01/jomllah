import { eventBus } from '../../infrastructure/events/index.js';
import { getIo } from '../../infrastructure/socket/index.js';

export const setupOfferEvents = () => {
  eventBus.on('remote.offer.created', (payload: { offer: any }) => {
    const io = getIo();
    io.to(`chat:${payload.offer.chatRoomId}`).emit('offer:received', payload.offer);
  });

  eventBus.on('remote.offer.countered', (payload: { parentOfferId: string, newOffer: any }) => {
    const io = getIo();
    io.to(`chat:${payload.newOffer.chatRoomId}`).emit('offer:countered', payload);
  });
};
