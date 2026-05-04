import { Prisma } from '@prisma/client';
export declare class TenantsRepository {
    findTenantById(id: string): Promise<({
        users: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        category: string;
        isVerified: boolean;
        subscriptionId: string | null;
    }) | null>;
    updateTenant(id: string, data: Prisma.TenantUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        category: string;
        isVerified: boolean;
        subscriptionId: string | null;
    }>;
    verifyTenant(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        category: string;
        isVerified: boolean;
        subscriptionId: string | null;
    }>;
}
//# sourceMappingURL=tenants.repository.d.ts.map