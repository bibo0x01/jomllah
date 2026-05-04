import { z } from 'zod';
import { createOfferSchema, counterOfferSchema } from './offers.validation.js';
export declare class OffersService {
    private offersRepo;
    createOffer(senderId: string, data: z.infer<typeof createOfferSchema>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
    counterOffer(senderId: string, parentOfferId: string, data: z.infer<typeof counterOfferSchema>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
    acceptOffer(userId: string, offerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
    rejectOffer(userId: string, offerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        chatRoomId: string;
        senderId: string;
        receiverId: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        status: import("@prisma/client").$Enums.OfferStatus;
        parentOfferId: string | null;
    }>;
}
//# sourceMappingURL=offers.service.d.ts.map