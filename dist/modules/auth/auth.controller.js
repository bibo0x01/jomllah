import { AuthService } from './auth.service.js';
import { loginSchema, registerSchema } from './auth.validation.js';
export class AuthController {
    authService = new AuthService();
    register = async (req, res, next) => {
        try {
            const validatedData = registerSchema.parse(req.body);
            const result = await this.authService.register(validatedData);
            res.status(201).json({
                status: 'success',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const validatedData = loginSchema.parse(req.body);
            const result = await this.authService.login(validatedData);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map