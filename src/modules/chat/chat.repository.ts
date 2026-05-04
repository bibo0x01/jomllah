import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma } from '@prisma/client';

export class ChatRepository {
  async findActiveChat(buyerId: string, tenantId: string, productId?: string) {
    const whereClause: any = { buyerId, tenantId };
    if (productId) {
      whereClause.productId = productId;
    }
    return prisma.chatRoom.findFirst({
      where: whereClause,
    });
  }

  async createChat(data: Prisma.ChatRoomUncheckedCreateInput) {
    return prisma.chatRoom.create({
      data,
    });
  }

  async getChatById(id: string) {
    return prisma.chatRoom.findUnique({
      where: { id },
    });
  }

  async createMessage(data: Prisma.MessageUncheckedCreateInput) {
    return prisma.message.create({
      data,
    });
  }

  async getChatMessages(chatRoomId: string) {
    return prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getChatsForUser(userId: string, role: string, tenantId?: string) {
    if (role === 'BUYER') {
      return prisma.chatRoom.findMany({
        where: { buyerId: userId },
        include: { tenant: { select: { businessName: true } }, product: { select: { name: true } } },
        orderBy: { updatedAt: 'desc' }
      });
    } else if (tenantId) {
      return prisma.chatRoom.findMany({
        where: { tenantId },
        include: { buyer: { select: { name: true } }, product: { select: { name: true } } },
        orderBy: { updatedAt: 'desc' }
      });
    }
    return [];
  }
}
