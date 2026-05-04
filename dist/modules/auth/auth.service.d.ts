import { z } from 'zod';
import { registerSchema, loginSchema } from './auth.validation.js';
export declare class AuthService {
    private authRepo;
    register(data: z.infer<typeof registerSchema>): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            tenantId: any;
        };
    }>;
    login(data: z.infer<typeof loginSchema>): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            tenantId: any;
        };
    }>;
    private generateAuthResponse;
}
//# sourceMappingURL=auth.service.d.ts.map