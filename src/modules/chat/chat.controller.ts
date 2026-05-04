import { Request, Response, NextFunction } from 'express';
import { ChatService } from './chat.service.js';
import { startChatSchema, sendMessageSchema } from './chat.validation.js';


export class ChatController {
  private chatService = new ChatService();

  startChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = startChatSchema.parse(req.body);
      const chat = await this.chatService.startChat(req.user!.userId, validatedData);
      res.status(201).json({ status: 'success', data: chat });
    } catch (error) {
      next(error);
    }
  };

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roomId } = req.params;
      const validatedData = sendMessageSchema.parse(req.body);
      const message = await this.chatService.sendMessage(req.user!.userId, roomId, validatedData);
      res.status(201).json({ status: 'success', data: message });
    } catch (error) {
      next(error);
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roomId } = req.params;
      const messages = await this.chatService.getChatHistory(roomId);
      res.status(200).json({ status: 'success', data: messages });
    } catch (error) {
      next(error);
    }
  };

  getMyChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chats = await this.chatService.getUserChats(
        req.user!.userId, 
        req.user!.role, 
        req.user!.tenantId
      );
      res.status(200).json({ status: 'success', data: chats });
    } catch (error) {
      next(error);
    }
  };
}
