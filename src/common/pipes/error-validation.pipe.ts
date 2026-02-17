import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.flatMap((err) => this.formatError(err));
        return new BadRequestException({ statusCode: 400, error: 'Bad Request', errors: formattedErrors });
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
