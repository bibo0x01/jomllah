import { Request, Response, NextFunction } from 'express';
export declare class ChatController {
    private chatService;
    startChat: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyChats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=chat.controller.d.ts.map