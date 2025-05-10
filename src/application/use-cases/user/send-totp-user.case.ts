import { SendEmail, UseCase } from '@core/abstracts';
import { generateTOTPEmailMessage } from '@core/utils';

export class SendTOTPUserCase implements UseCase<any, void> {
  constructor(private readonly sendEmail: SendEmail) {}

  async execute(params): Promise<void> {
    const content = generateTOTPEmailMessage(params.to, params.totp);
    await this.sendEmail.send(content);
  }
}
