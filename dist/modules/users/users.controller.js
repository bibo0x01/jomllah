import { UsersService } from './users.service.js';
import { updateUserSchema } from './users.validation.js';
export class UsersController {
    usersService = new UsersService();
    getProfile = async (req, res, next) => {
        try {
            const user = await this.usersService.getUserProfile(req.user.userId);
            res.status(200).json({ status: 'success', data: user });
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            const validatedData = updateUserSchema.parse(req.body);
            const updated = await this.usersService.updateUser(req.user.userId, validatedData);
            res.status(200).json({ status: 'success', data: updated });
        }
        catch (error) {
            next(error);
        }
    };
    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.usersService.getAllUsers();
            res.status(200).json({ status: 'success', data: users });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=users.controller.js.map