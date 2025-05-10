import { Provider } from '@nestjs/common';
import { SendEmail } from '@core/abstracts';
import { SendEmailCase } from '@application/use-cases';
import { createUseCaseProvider } from '@shared/utils';
import { EmailService } from './email.service';

export const emailProvider: Provider[] = [
  { provide: SendEmail, useClass: EmailService },
  createUseCaseProvider(SendEmailCase, [SendEmail]),
];
