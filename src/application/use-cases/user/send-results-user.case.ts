import {
  LocalStorage,
  PdfManager,
  SendEmail,
  TokenManager,
  UseCase,
} from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  ScannedDocumentsRepository,
} from '@core/repositories';
import { generateResultsEmailMessage } from '@core/utils';

export class SendResultsUserCase implements UseCase<any, void> {
  constructor(
    private readonly sendEmail: SendEmail,
    private readonly localStorage: LocalStorage,
    private readonly tokenManager: TokenManager,
    private readonly pdfManager: PdfManager,
    private readonly allergyDocumentsRepository: AllergyDocumentsRepository,
    private readonly clinicalScannedDocumentsRepository: ClinicalScannedDocumentsRepository,
    private readonly glScannedDocumentsRepository: GlScannedDocumentsRepository,
    private readonly patientDnrDocumentsRepository: PatientDnrDocumentsRepository,
    private readonly patientreFerralDetailDocumentsRepository: PatientreFerralDetailDocumentsRepository,
    private readonly scannedDocumentsRepository: ScannedDocumentsRepository,
  ) {}

  async execute(patient: PatientEntity): Promise<void> {
    try {
      const files: string[] = [];

      const promises = [
        this.allergyDocumentsRepository.find(patient),
        this.clinicalScannedDocumentsRepository.find(patient),
        this.glScannedDocumentsRepository.find(patient),
        this.patientDnrDocumentsRepository.find(patient),
        this.patientreFerralDetailDocumentsRepository.find(patient),
        this.scannedDocumentsRepository.find(patient),
      ];

      const results = (await Promise.all(promises)).flat();

      // TODO: catch when patient results is empty
      if (results && results.length > 0) {
        for (const result of results) {
          const base64Data = this.pdfManager.decodeBase64Pdf(
            result.scanneddocument,
          );

          const file = await this.localStorage.upload(
            base64Data.buffer,
            result.documentname,
          );

          files.push(file);
        }
      }

      const token = this.tokenManager.sign({ mrn: patient.mrn });

      // if (!patient.contact.emailid) {
      //   throw new NotFoundException('Email not found');
      // }

      // const content = generateResultsEmailMessage(contact.emailid, token, files);
      const content = generateResultsEmailMessage(
        'reginaldventura23@gmail.com',
        token,
        files,
      );

      await this.sendEmail.send(content);
    } catch (error) {
      console.log('Error', error);
    }
  }
}
