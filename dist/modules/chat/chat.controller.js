import { ChatService } from './chat.service.js';
import { startChatSchema, sendMessageSchema } from './chat.validation.js';
export class ChatController {
    chatService = new ChatService();
    startChat = async (req, res, next) => {
        try {
            const validatedData = startChatSchema.parse(req.body);
            const chat = await this.chatService.startChat(req.user.userId, validatedData);
            res.status(201).json({ status: 'success', data: chat });
        }
        catch (error) {
            next(error);
        }
    };
    sendMessage = async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const validatedData = sendMessageSchema.parse(req.body);
            const message = await this.chatService.sendMessage(req.user.userId, roomId, validatedData);
            res.status(201).json({ status: 'success', data: message });
        }
        catch (error) {
            next(error);
        }
    };
    getHistory = async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const messages = await this.chatService.getChatHistory(roomId);
            res.status(200).json({ status: 'success', data: messages });
        }
        catch (error) {
            next(error);
        }
    };
    getMyChats = async (req, res, next) => {
        try {
            const chats = await this.chatService.getUserChats(req.user.userId, req.user.role, req.user.tenantId);
            res.status(200).json({ status: 'success', data: chats });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=chat.controller.js.map