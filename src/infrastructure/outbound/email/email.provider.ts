import { Provider } from '@nestjs/common';
import { SendEmail } from '@core/abstracts';
import { EmailService } from './email.service';

export const emailProvider: Provider[] = [
  { provide: SendEmail, useClass: EmailService },
];
