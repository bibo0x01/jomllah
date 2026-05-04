import { redisClient } from '../../infrastructure/redis/index.js';

export class AnalyticsService {
  async incrementTenantMetric(tenantId: string, metric: string, eventId: string) {
    const idempotencyKey = `analytics:processed:${eventId}`;
    
    // Check if we've already processed this exact event
    const alreadyProcessed = await redisClient.get(idempotencyKey);
    if (alreadyProcessed) return false;

    // Increment counter
    const metricKey = `analytics:tenant:${tenantId}:${metric}`;
    await redisClient.incr(metricKey);

    // Mark as processed (expire after 24 hours to save memory)
    await redisClient.setEx(idempotencyKey, 86400, '1');
    
    return true;
  }

  async getTenantMetrics(tenantId: string) {
    const chatsOpenedStr = await redisClient.get(`analytics:tenant:${tenantId}:chats_opened`);
    const ordersCompletedStr = await redisClient.get(`analytics:tenant:${tenantId}:orders_completed`);

    return {
      chatsOpened: parseInt(chatsOpenedStr || '0', 10),
      ordersCompleted: parseInt(ordersCompletedStr || '0', 10),
    };
  }
}
