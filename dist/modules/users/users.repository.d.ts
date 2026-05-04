import { Prisma } from '@prisma/client';
export declare class UsersRepository {
    findUserById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        createdAt: Date;
        tenantId: string | null;
    } | null>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
    getAllUsers(): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string | null;
    }[]>;
}
//# sourceMappingURL=users.repository.d.ts.map