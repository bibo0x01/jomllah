import { EventEmitter } from 'events';
import { redisPublisher, redisSubscriber } from '../redis/index.js';
import { logger } from '../logger/index.js';
// Local Event Bus for intra-module communication
export const eventBus = new EventEmitter();
// Listen to specific domain events and publish them to Redis for cross-node sync
const DISTRIBUTED_EVENTS = [
    'offer.created',
    'offer.countered',
    'offer.accepted',
    'chat.message.sent',
    'order.created'
];
export const setupEventBus = async () => {
    // 1. Forward domain events to Redis Pub/Sub
    for (const eventName of DISTRIBUTED_EVENTS) {
        eventBus.on(eventName, async (payload) => {
            try {
                await redisPublisher.publish('jomllah:events', JSON.stringify({ event: eventName, payload }));
            }
            catch (error) {
                logger.error(error, `Failed to publish event ${eventName} to Redis`);
            }
        });
    }
    // 2. Listen to Redis Pub/Sub and forward to local Event Bus as remote events
    await redisSubscriber.subscribe('jomllah:events', (message) => {
        try {
            const { event, payload } = JSON.parse(message);
            // Emit as a remote event so we don't cause an infinite loop
            eventBus.emit(`remote.${event}`, payload);
        }
        catch (error) {
            logger.error(error, 'Failed to parse incoming Redis event message');
        }
    });
    logger.info('Distributed Event Bus configured.');
};
//# sourceMappingURL=index.js.map