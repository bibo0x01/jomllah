import { eventBus } from '../../infrastructure/events/index.js';
import { getIo } from '../../infrastructure/socket/index.js';

export const setupChatEvents = () => {
  eventBus.on('remote.chat.message.sent', (payload: { chatRoomId: string, message: any }) => {
    // When a message is sent (even from another node), broadcast it to the local Socket.io room
    const io = getIo();
    io.to(`chat:${payload.chatRoomId}`).emit('chat:message:received', payload.message);
  });
};
