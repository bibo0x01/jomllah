import { UsersRepository } from './users.repository.js';
import { NotFoundError } from '../../shared/exceptions/AppError.js';
export class UsersService {
    usersRepo = new UsersRepository();
    async getUserProfile(userId) {
        const user = await this.usersRepo.findUserById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }
    async updateUser(userId, data) {
        await this.getUserProfile(userId);
        return this.usersRepo.updateUser(userId, data);
    }
    async getAllUsers() {
        return this.usersRepo.getAllUsers();
    }
}
//# sourceMappingURL=users.service.js.map