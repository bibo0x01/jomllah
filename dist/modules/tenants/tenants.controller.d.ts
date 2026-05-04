import { Request, Response, NextFunction } from 'express';
export declare class TenantsController {
    private tenantsService;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyTenant: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=tenants.controller.d.ts.map