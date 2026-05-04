import { prisma } from '../../infrastructure/prisma/index.js';
import { Prisma } from '@prisma/client';

export class UsersRepository {
  async findUserById(id: string) {
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

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
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
