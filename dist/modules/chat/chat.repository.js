import { prisma } from '../../infrastructure/prisma/index.js';
export class ChatRepository {
    async findActiveChat(buyerId, tenantId, productId) {
        const whereClause = { buyerId, tenantId };
        if (productId) {
            whereClause.productId = productId;
        }
        return prisma.chatRoom.findFirst({
            where: whereClause,
        });
    }
    async createChat(data) {
        return prisma.chatRoom.create({
            data,
        });
    }
    async getChatById(id) {
        return prisma.chatRoom.findUnique({
            where: { id },
        });
    }
    async createMessage(data) {
        return prisma.message.create({
            data,
        });
    }
    async getChatMessages(chatRoomId) {
        return prisma.message.findMany({
            where: { chatRoomId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async getChatsForUser(userId, role, tenantId) {
        if (role === 'BUYER') {
            return prisma.chatRoom.findMany({
                where: { buyerId: userId },
                include: { tenant: { select: { businessName: true } }, product: { select: { name: true } } },
                orderBy: { updatedAt: 'desc' }
            });
        }
        else if (tenantId) {
            return prisma.chatRoom.findMany({
                where: { tenantId },
                include: { buyer: { select: { name: true } }, product: { select: { name: true } } },
                orderBy: { updatedAt: 'desc' }
            });
        }
        return [];
    }
}
//# sourceMappingURL=chat.repository.js.map