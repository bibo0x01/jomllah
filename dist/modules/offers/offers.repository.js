import { prisma } from '../../infrastructure/prisma/index.js';
export class OffersRepository {
    async createOffer(data) {
        return prisma.offer.create({
            data,
        });
    }
    async getOfferById(id) {
        return prisma.offer.findUnique({
            where: { id },
            include: { chatRoom: true }
        });
    }
    async updateOfferStatus(id, status) {
        return prisma.offer.update({
            where: { id },
            data: { status },
        });
    }
    async getOffersByChatRoom(chatRoomId) {
        return prisma.offer.findMany({
            where: { chatRoomId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async createCounterOffer(parentOfferId, data) {
        return prisma.$transaction(async (tx) => {
            // Mark parent offer as COUNTERED
            await tx.offer.update({
                where: { id: parentOfferId },
                data: { status: 'COUNTERED' },
            });
            // Create new offer linked to parent
            const newOffer = await tx.offer.create({
                data: {
                    ...data,
                    parentOfferId,
                },
            });
            return newOffer;
        });
    }
}
//# sourceMappingURL=offers.repository.js.map