import { Prisma, OfferStatus } from '@prisma/client';
export declare class OffersRepository {
    createOffer(data: Prisma.OfferUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: Prisma.Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
    getOfferById(id: string): Promise<({
        chatRoom: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            buyerId: string;
            productId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: Prisma.Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }) | null>;
    updateOfferStatus(id: string, status: OfferStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: Prisma.Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
    getOffersByChatRoom(chatRoomId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: Prisma.Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }[]>;
    createCounterOffer(parentOfferId: string, data: Prisma.OfferUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: Prisma.Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
}
//# sourceMappingURL=offers.repository.d.ts.map