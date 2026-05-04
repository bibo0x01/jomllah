import { Prisma } from '@prisma/client';
export declare class AuthRepository {
    findUserByEmail(email: string): Promise<({
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            businessName: string;
            category: string;
            isVerified: boolean;
            subscriptionId: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
    }) | null>;
    createUserWithTenant(userData: Prisma.UserCreateInput, tenantData?: Prisma.TenantCreateWithoutUsersInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string | null;
        };
        tenant: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            businessName: string;
            category: string;
            isVerified: boolean;
            subscriptionId: string | null;
        };
    } | {
        user: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string | null;
        };
        tenant: null;
    }>;
}
//# sourceMappingURL=auth.repository.d.ts.map