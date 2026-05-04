import { Request, Response, NextFunction } from 'express';
export declare class UsersController {
    private usersService;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map