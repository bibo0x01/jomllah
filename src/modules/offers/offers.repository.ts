import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma, OfferStatus } from '@prisma/client';

export class OffersRepository {
  async createOffer(data: Prisma.OfferUncheckedCreateInput) {
    return prisma.offer.create({
      data,
    });
  }

  async getOfferById(id: string) {
    return prisma.offer.findUnique({
      where: { id },
      include: { chatRoom: true }
    });
  }

  async updateOfferStatus(id: string, status: OfferStatus) {
    return prisma.offer.update({
      where: { id },
      data: { status },
    });
  }

  async getOffersByChatRoom(chatRoomId: string) {
    return prisma.offer.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createCounterOffer(parentOfferId: string, data: Prisma.OfferUncheckedCreateInput) {
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
