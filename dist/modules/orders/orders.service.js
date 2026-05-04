import { OrdersRepository } from './orders.repository.js';
import { eventBus } from '../../infrastructure/events/index.js';
import { NotFoundError, ForbiddenError } from '../../shared/exceptions/AppError.js';
export class OrdersService {
    ordersRepo = new OrdersRepository();
    async createOrderFromOffer(offer) {
        // Determine the original buyer and supplier
        // The ChatRoom inherently has buyerId and tenantId
        const { prisma } = await import('../../infrastructure/prisma/index.js');
        const chatRoom = await prisma.chatRoom.findUnique({ where: { id: offer.chatRoomId } });
        if (!chatRoom)
            throw new Error('ChatRoom not found for offer');
        const order = await this.ordersRepo.createOrder({
            chatRoomId: chatRoom.id,
            tenantId: chatRoom.tenantId,
            buyerId: chatRoom.buyerId,
            productId: chatRoom.productId,
            agreedPrice: offer.price,
            quantity: offer.quantity,
            status: 'PENDING',
        });
        eventBus.emit('order.created', { order });
        return order;
    }
    async updateOrderStatus(userId, tenantId, orderId, status) {
        const order = await this.ordersRepo.getOrderById(orderId);
        if (!order)
            throw new NotFoundError('Order not found');
        // Only supplier (tenant) can update status, except for CANCELLED which buyer might do if PENDING
        if (tenantId && order.tenantId !== tenantId) {
            throw new ForbiddenError('You can only update your own orders');
        }
        const updated = await this.ordersRepo.updateOrderStatus(orderId, status);
        eventBus.emit('order.updated', { order: updated });
        return updated;
    }
    async getMyOrders(userId, role, tenantId) {
        if (role === 'BUYER') {
            return this.ordersRepo.getOrdersForBuyer(userId);
        }
        else if (tenantId) {
            return this.ordersRepo.getOrdersForTenant(tenantId);
        }
        return [];
    }
}
//# sourceMappingURL=orders.service.js.map