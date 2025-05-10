import { Provider } from '@nestjs/common';
import { SendEmail } from '@core/abstracts';
import { SendEmailCase } from '@application/use-cases';
import { EmailService } from './email.service';

export const emailProvider: Provider[] = [
  { provide: SendEmail, useClass: EmailService },
  {
    provide: SendEmailCase,
    useFactory: (sendEmail: SendEmail) => new SendEmailCase(sendEmail),
    inject: [SendEmail],
  },
];
