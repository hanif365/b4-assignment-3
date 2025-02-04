import { TErrorDetails } from '../interface/error';

export class AppError extends Error {
  statusCode: number;
  errorDetails: TErrorDetails;
  constructor(
    statusCode: number,
    message: string,
    errorDetails: TErrorDetails,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
