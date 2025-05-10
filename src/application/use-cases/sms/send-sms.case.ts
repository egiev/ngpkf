import { SendSMS, UseCase } from '@core/abstracts';

export class SendSMSCase implements UseCase<string, void> {
  constructor(private readonly sendSMS: SendSMS) {}

  async execute(params: string | undefined): Promise<void> {
    await this.sendSMS.send();
  }
}
