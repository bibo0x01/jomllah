import { Router } from 'express';
import { ChatController } from './chat.controller.js';
import { requireAuth, requireRoles } from '../../shared/middlewares/auth.js';

const router = Router();
const chatController = new ChatController();

router.get('/', requireAuth, chatController.getMyChats);

router.post(
  '/start',
  requireAuth,
  requireRoles(['BUYER']), // Only buyers start chats
  chatController.startChat
);

router.get('/:roomId/messages', requireAuth, chatController.getHistory);
router.post('/:roomId/messages', requireAuth, chatController.sendMessage);

export { router as chatRoutes };
