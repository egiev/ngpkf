import { LocalStorage, SendEmail, UseCase } from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { generateResultsEmailMessage } from '@core/utils';
import { decodeBase64Pdf } from '@shared/utils';

export class SendResultsUserCase implements UseCase<any, void> {
  constructor(
    private readonly sendEmail: SendEmail,
    private readonly localStorage: LocalStorage,
  ) {}

  async execute({ contact, results }: PatientEntity): Promise<void> {
    const files: string[] = [];

    if (results && results.length > 0) {
      for (const result of results) {
        const base64Data = decodeBase64Pdf(result.base64);
        const file: string = await this.localStorage.upload(
          base64Data.buffer,
          base64Data.filename,
        );
        files.push(file);
      }
    }

    const content = generateResultsEmailMessage(contact.email, files);
    await this.sendEmail.send(content);
  }
}
