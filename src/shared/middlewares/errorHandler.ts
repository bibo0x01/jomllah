import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/AppError.js';
import { logger } from '../../infrastructure/logger/index.js';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: err.issues,
    });
  }

  // Handle generic / unhandled errors
  logger.error(err, 'Unhandled Exception:');

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
