import { z } from 'zod';
import { updateUserSchema } from './users.validation.js';
export declare class UsersService {
    private usersRepo;
    getUserProfile(userId: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        createdAt: Date;
        tenantId: string | null;
    }>;
    updateUser(userId: string, data: z.infer<typeof updateUserSchema>): Promise<{
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
//# sourceMappingURL=users.service.d.ts.map