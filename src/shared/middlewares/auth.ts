import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index.js';
import { UnauthorizedError, ForbiddenError } from '../exceptions/AppError.js';
import type { JwtPayload } from '../types/index.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or invalid authorization header'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, String(config.jwtSecret)) as unknown as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

export const requireRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }
    next();
  };
};

export const requireTenant = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'));
  }
  
  if (!req.user.tenantId) {
    return next(new ForbiddenError('This action requires a tenant context'));
  }

  req.tenantId = req.user.tenantId;
  next();
};
