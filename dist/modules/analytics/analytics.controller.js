import { AnalyticsService } from './analytics.service.js';
export class AnalyticsController {
    analyticsService = new AnalyticsService();
    getMyMetrics = async (req, res, next) => {
        try {
            const metrics = await this.analyticsService.getTenantMetrics(req.tenantId);
            // Calculate conversion rate dynamically
            const conversionRate = metrics.chatsOpened > 0
                ? ((metrics.ordersCompleted / metrics.chatsOpened) * 100).toFixed(2) + '%'
                : '0%';
            res.status(200).json({
                status: 'success',
                data: {
                    ...metrics,
                    conversionRate
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=analytics.controller.js.map