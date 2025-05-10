import { SendEmail, UseCase } from '@core/abstracts';

export class SendTOTPUserUseCase implements UseCase<any, void> {
  constructor(private readonly sendEmail: SendEmail) {}

  async execute(params: any): Promise<void> {
    await this.sendEmail.send(params);
  }
}
