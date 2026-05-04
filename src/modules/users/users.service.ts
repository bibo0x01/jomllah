import { UsersRepository } from './users.repository.js';
import { z } from 'zod';
import { updateUserSchema } from './users.validation.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';

export class UsersService {
  private usersRepo = new UsersRepository();

  async getUserProfile(userId: string) {
    const user = await this.usersRepo.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateUser(userId: string, data: z.infer<typeof updateUserSchema>) {
    await this.getUserProfile(userId);
    return this.usersRepo.updateUser(userId, data);
  }

  async getAllUsers() {
    return this.usersRepo.getAllUsers();
  }
}
