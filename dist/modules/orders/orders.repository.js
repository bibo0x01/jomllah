import { prisma } from '../../infrastructure/prisma/index.js';
export class OrdersRepository {
    async createOrder(data) {
        return prisma.order.create({
            data,
        });
    }
    async getOrderById(id) {
        return prisma.order.findUnique({
            where: { id },
            include: {
                product: { select: { name: true, images: true } },
                tenant: { select: { businessName: true } },
                buyer: { select: { name: true } },
            }
        });
    }
    async updateOrderStatus(id, status) {
        return prisma.order.update({
            where: { id },
            data: { status },
        });
    }
    async getOrdersForTenant(tenantId) {
        return prisma.order.findMany({
            where: { tenantId },
            include: { buyer: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrdersForBuyer(buyerId) {
        return prisma.order.findMany({
            where: { buyerId },
            include: { tenant: { select: { businessName: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
}
//# sourceMappingURL=orders.repository.js.map