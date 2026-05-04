import { createClient } from 'redis';
import { config } from '../../config/index.js';
import { logger } from '../logger/index.js';
export const redisClient = createClient({
    url: config.redisUrl,
});
export const redisPublisher = redisClient.duplicate();
export const redisSubscriber = redisClient.duplicate();
redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisPublisher.on('error', (err) => logger.error('Redis Publisher Error', err));
redisSubscriber.on('error', (err) => logger.error('Redis Subscriber Error', err));
export const connectRedis = async () => {
    await Promise.all([
        redisClient.connect(),
        redisPublisher.connect(),
        redisSubscriber.connect(),
    ]);
    logger.info('Connected to Redis instances (Client, Publisher, Subscriber)');
};
export const disconnectRedis = async () => {
    await Promise.all([
        redisClient.quit(),
        redisPublisher.quit(),
        redisSubscriber.quit(),
    ]);
    logger.info('Disconnected from Redis');
};
//# sourceMappingURL=index.js.map