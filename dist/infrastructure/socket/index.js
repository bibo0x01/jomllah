import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redisPublisher, redisSubscriber } from '../redis/index.js';
import { logger } from '../logger/index.js';
let io;
export const setupSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // Adjust for production
            methods: ['GET', 'POST']
        }
    });
    // Scale Socket.io across nodes using Redis
    io.adapter(createAdapter(redisPublisher, redisSubscriber));
    io.on('connection', (socket) => {
        logger.info(`User connected via Socket.io: ${socket.id}`);
        // Wait for the client to authenticate and join their rooms
        socket.on('join_room', (roomId) => {
            socket.join(`chat:${roomId}`);
            logger.info(`Socket ${socket.id} joined room chat:${roomId}`);
        });
        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`);
        });
    });
    logger.info('Socket.io initialized with Redis adapter.');
    return io;
};
export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
//# sourceMappingURL=index.js.map