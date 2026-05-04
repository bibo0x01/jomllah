export declare class AnalyticsService {
    incrementTenantMetric(tenantId: string, metric: string, eventId: string): Promise<boolean>;
    getTenantMetrics(tenantId: string): Promise<{
        chatsOpened: number;
        ordersCompleted: number;
    }>;
}
//# sourceMappingURL=analytics.service.d.ts.map