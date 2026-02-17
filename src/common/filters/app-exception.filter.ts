import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../exceptions';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let errors: any = null;

    // 🔥 CLEAN ARCH EXCEPTION (from use-case)
    if (exception instanceof AppException) {
      return res.status(exception.statusCode).json({
        success: false,
        statusCode: exception.statusCode,
        message: exception.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errors: exception.errors ?? null,
        timestamp: new Date().toISOString(),
      });
    }

    // 🔥 NestJS HTTP exception
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse() as { message?: string | string[]; errors?: unknown };

      if (typeof response === 'string') {
        message = response;
      } else {
        message = response.message || 'Error';

        // validation array
        if (Array.isArray(response.message)) {
          message = 'Validation failed';
          errors = response.message;
        }

        // handle errors object
        if (response.errors) {
          errors = response.errors;
        }
      }
    }

    // 🔥 unknown error (db etc)
    if (!(exception instanceof HttpException) && !(exception instanceof AppException)) {
      this.logger.error('UNHANDLED ERROR:', exception);
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
