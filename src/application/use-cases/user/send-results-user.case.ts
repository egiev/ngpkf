import {
  LocalStorage,
  SendEmail,
  TokenManager,
  UseCase,
} from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { generateResultsEmailMessage } from '@core/utils';
import { decodeBase64Pdf } from '@shared/utils';

export class SendResultsUserCase implements UseCase<any, void> {
  constructor(
    private readonly sendEmail: SendEmail,
    private readonly localStorage: LocalStorage,
    private readonly tokenManager: TokenManager,
  ) {}

  async execute({ mrn, contact, results }: PatientEntity): Promise<void> {
    const files: string[] = [];

    // TODO: catch when patient results is empty
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

    const token = this.tokenManager.sign({ mrn });
    const content = generateResultsEmailMessage(contact.email, token, files);
    await this.sendEmail.send(content);
  }
}
