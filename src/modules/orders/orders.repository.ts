import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma, OrderStatus } from '@prisma/client';

export class OrdersRepository {
  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return prisma.order.create({
      data,
    });
  }

  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        product: { select: { name: true, images: true } },
        tenant: { select: { businessName: true } },
        buyer: { select: { name: true } },
      }
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async getOrdersForTenant(tenantId: string) {
    return prisma.order.findMany({
      where: { tenantId },
      include: { buyer: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrdersForBuyer(buyerId: string) {
    return prisma.order.findMany({
      where: { buyerId },
      include: { tenant: { select: { businessName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
