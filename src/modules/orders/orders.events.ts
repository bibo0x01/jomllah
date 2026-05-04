import { eventBus } from '../../infrastructure/events/index.js';
import { OrdersService } from './orders.service.js';
import { getIo } from '../../infrastructure/socket/index.js';
import { logger } from '../../infrastructure/logger/index.js';

export const setupOrderEvents = () => {
  const ordersService = new OrdersService();

  // Listen for offer acceptance to trigger order creation
  eventBus.on('remote.offer.accepted', async (payload: { offer: any }) => {
    try {
      // Only one node should ideally handle this to prevent duplicate orders.
      // In a production setup, this would be a queued job or handled with a Redis lock.
      // For this implementation, we will attempt to create it.
      await ordersService.createOrderFromOffer(payload.offer);
    } catch (error) {
      logger.error('Failed to create order from accepted offer', error);
    }
  });

  eventBus.on('remote.order.created', (payload: { order: any }) => {
    const io = getIo();
    io.to(`chat:${payload.order.chatRoomId}`).emit('order:created', payload.order);
  });
};
