import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { AppError } from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import mongoose from 'mongoose';
import { TErrorDetails } from '../interface/error';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let errorDetails: TErrorDetails = [];

  if (err instanceof ZodError) {
    console.log(
      'ami asi re zod error: **********************************',
      err,
    );
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (err instanceof mongoose.Error.ValidationError) {
    console.log(
      'ami asi re validation error: **********************************',
      err,
    );
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (err instanceof AppError) {
    console.log(
      'ami asi re app error: **********************************',
      err,
    );
    statusCode = err?.statusCode;
    message = err?.message;
    errorDetails = [
      {
        path: '',
        details: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    console.log('ami asi re error: **********************************', err);
    message = err?.message;
    errorDetails = [
      {
        path: '',
        details: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: {
      details: errorDetails,
    },
    stack: config.env === 'development' ? err?.stack : undefined,
  });
  next();
};
