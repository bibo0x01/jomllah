import { z } from 'zod';
import { updateTenantSchema } from './tenants.validation.js';
export declare class TenantsService {
    private tenantsRepo;
    getTenantProfile(tenantId: string): Promise<{
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
    }>;
    updateTenant(tenantId: string, data: z.infer<typeof updateTenantSchema>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        category: string;
        isVerified: boolean;
        subscriptionId: string | null;
    }>;
    verifyTenant(tenantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        category: string;
        isVerified: boolean;
        subscriptionId: string | null;
    }>;
}
//# sourceMappingURL=tenants.service.d.ts.map