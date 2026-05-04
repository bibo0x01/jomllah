import { z } from 'zod';
import { startChatSchema, sendMessageSchema } from './chat.validation.js';
export declare class ChatService {
    private chatRepo;
    startChat(buyerId: string, data: z.infer<typeof startChatSchema>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
    }>;
    sendMessage(senderId: string, chatRoomId: string, data: z.infer<typeof sendMessageSchema>): Promise<{
        id: string;
        createdAt: Date;
        chatRoomId: string;
        senderId: string;
        content: string;
        isRead: boolean;
    }>;
    getChatHistory(chatRoomId: string): Promise<{
        id: string;
        createdAt: Date;
        chatRoomId: string;
        senderId: string;
        content: string;
        isRead: boolean;
    }[]>;
    getUserChats(userId: string, role: string, tenantId?: string): Promise<({
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
//# sourceMappingURL=chat.service.d.ts.map