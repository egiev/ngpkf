import { SendEmail, UseCase } from '@core/abstracts';

export class SendEmailCase implements UseCase<string, void> {
  constructor(private readonly sendEmail: SendEmail) {}

  async execute(params): Promise<void> {
    await this.sendEmail.send(params);
  }
}
