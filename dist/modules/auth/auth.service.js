import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository.js';
import { ValidationError, UnauthorizedError } from '../../shared/exceptions/AppError.js';
import { config } from '../../config/index.js';
export class AuthService {
    authRepo = new AuthRepository();
    async register(data) {
        const existingUser = await this.authRepo.findUserByEmail(data.email);
        if (existingUser) {
            throw new ValidationError('Email already in use');
        }
        const hashedPassword = await bcryptjs.hash(data.password, 10);
        let tenantData = undefined;
        if (data.role === 'SUPPLIER_OWNER' && data.businessName && data.category) {
            tenantData = {
                businessName: data.businessName,
                category: data.category,
            };
        }
        const result = await this.authRepo.createUserWithTenant({
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role,
        }, tenantData);
        return this.generateAuthResponse(result.user);
    }
    async login(data) {
        const user = await this.authRepo.findUserByEmail(data.email);
        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }
        const isMatch = await bcryptjs.compare(data.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedError('Invalid email or password');
        }
        return this.generateAuthResponse(user);
    }
    generateAuthResponse(user) {
        const payload = {
            userId: user.id,
            role: user.role,
            tenantId: user.tenantId || undefined,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                tenantId: user.tenantId,
            }
        };
    }
}
//# sourceMappingURL=auth.service.js.map