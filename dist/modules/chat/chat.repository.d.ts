import { Prisma } from '@prisma/client';
export declare class ChatRepository {
    findActiveChat(buyerId: string, tenantId: string, productId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    } | null>;
    createChat(data: Prisma.ChatRoomUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    }>;
    getChatById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    } | null>;
    createMessage(data: Prisma.MessageUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        chatRoomId: string;
        senderId: string;
        content: string;
        isRead: boolean;
    }>;
    getChatMessages(chatRoomId: string): Promise<{
        id: string;
        createdAt: Date;
        chatRoomId: string;
        senderId: string;
        content: string;
        isRead: boolean;
    }[]>;
    getChatsForUser(userId: string, role: string, tenantId?: string): Promise<({
        tenant: {
            businessName: string;
        };
        product: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    })[] | ({
        product: {
            name: string;
        } | null;
        buyer: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    })[]>;
}
//# sourceMappingURL=chat.repository.d.ts.map