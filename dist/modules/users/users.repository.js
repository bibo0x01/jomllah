import { prisma } from '../../infrastructure/prisma/index.js';
export class UsersRepository {
    async findUserById(id) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
                tenantId: true,
                createdAt: true,
            }
        });
    }
    async updateUser(id, data) {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatarUrl: true,
            }
        });
    }
    // Used by Admin
    async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                tenantId: true,
            }
        });
    }
}
//# sourceMappingURL=users.repository.js.map