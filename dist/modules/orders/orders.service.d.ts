import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private ordersRepo;
    createOrderFromOffer(offer: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    updateOrderStatus(userId: string, tenantId: string | undefined, orderId: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getMyOrders(userId: string, role: string, tenantId?: string): Promise<({
        tenant: {
            businessName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal;
    })[] | ({
        buyer: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
}
//# sourceMappingURL=orders.service.d.ts.map