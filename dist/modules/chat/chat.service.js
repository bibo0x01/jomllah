import { ChatRepository } from './chat.repository.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';
import { eventBus } from '../../infrastructure/events/index.js';
export class ChatService {
    chatRepo = new ChatRepository();
    async startChat(buyerId, data) {
        // Check if an active negotiation session already exists for this context
        let chat = await this.chatRepo.findActiveChat(buyerId, data.tenantId, data.productId);
        if (!chat) {
            chat = await this.chatRepo.createChat({
                buyerId,
                tenantId: data.tenantId,
                productId: data.productId,
            });
            // Emit event for analytics (chats opened)
            eventBus.emit('chat.created', { chatRoomId: chat.id, tenantId: data.tenantId });
        }
        return chat;
    }
    async sendMessage(senderId, chatRoomId, data) {
        const chat = await this.chatRepo.getChatById(chatRoomId);
        if (!chat)
            throw new NotFoundError('Chat room not found');
        // Basic authorization: Sender must be the buyer or belong to the tenant
        // Ideally, we'd check if senderId is the buyer, or sender's tenantId matches chat.tenantId
        const message = await this.chatRepo.createMessage({
            chatRoomId,
            senderId,
            content: data.content,
        });
        // Emit domain event which will go to Redis Pub/Sub to reach the socket server
        eventBus.emit('chat.message.sent', {
            chatRoomId,
            message,
        });
        return message;
    }
    async getChatHistory(chatRoomId) {
        return this.chatRepo.getChatMessages(chatRoomId);
    }
    async getUserChats(userId, role, tenantId) {
        return this.chatRepo.getChatsForUser(userId, role, tenantId);
    }
}
//# sourceMappingURL=chat.service.js.map