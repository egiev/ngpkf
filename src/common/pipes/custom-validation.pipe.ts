import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BadRequestAppException } from '../exceptions';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.flatMap((err) => this.formatError(err));
        return new BadRequestAppException('Bad Request', formattedErrors);
      },
    });
  }

  private formatError(err: ValidationError): Array<{ field: string; message: string }> {
    if (err.constraints) {
      return Object.values(err.constraints).map((message) => ({
        field: err.property,
        message,
      }));
    }

    if (err.children && err.children.length > 0) {
      return err.children.flatMap((child) => this.formatError(child));
    }

    return [];
  }
}
