import { eventBus } from '../../infrastructure/events/index.js';
import { AnalyticsService } from './analytics.service.js';
import { logger } from '../../infrastructure/logger/index.js';
export const setupAnalyticsEvents = () => {
    const analyticsService = new AnalyticsService();
    // We listen to the local domain event bus.
    // Because it's idempotent, even if multiple nodes process the remote event,
    // only one increment will happen per eventId.
    eventBus.on('remote.chat.created', async (payload) => {
        try {
            await analyticsService.incrementTenantMetric(payload.tenantId, 'chats_opened', `chat_opened_${payload.chatRoomId}`);
        }
        catch (error) {
            logger.error('Analytics tracking error (chats_opened)', error);
        }
    });
    eventBus.on('remote.order.created', async (payload) => {
        try {
            await analyticsService.incrementTenantMetric(payload.order.tenantId, 'orders_completed', `order_created_${payload.order.id}`);
        }
        catch (error) {
            logger.error('Analytics tracking error (orders_completed)', error);
        }
    });
};
//# sourceMappingURL=analytics.events.js.map