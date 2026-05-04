import { Prisma, OrderStatus } from '@prisma/client';
export declare class OrdersRepository {
    createOrder(data: Prisma.OrderUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: Prisma.Decimal;
    }>;
    getOrderById(id: string): Promise<({
        tenant: {
            businessName: string;
        };
        product: {
            name: string;
            images: string[];
        } | null;
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
        agreedPrice: Prisma.Decimal;
    }) | null>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        buyerId: string;
        productId: string | null;
        chatRoomId: string;
        quantity: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        agreedPrice: Prisma.Decimal;
    }>;
    getOrdersForTenant(tenantId: string): Promise<({
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
        agreedPrice: Prisma.Decimal;
    })[]>;
    getOrdersForBuyer(buyerId: string): Promise<({
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
        agreedPrice: Prisma.Decimal;
    })[]>;
}
//# sourceMappingURL=orders.repository.d.ts.map