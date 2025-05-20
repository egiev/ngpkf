import { Provider } from '@nestjs/common';
import {
  LocalStorage,
  MessageBroker,
  PdfManager,
  SendEmail,
  TokenManager,
  Totp,
} from '@core/abstracts';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  PatientRepository,
  PurchasingDocumentsRepository,
  UserRepository,
} from '@core/repositories';
import {
  CreateUserCase,
  DownloadResultUserCase,
  FindUserCase,
  GenerateTOTPUserCase,
  SendResultsUserCase,
  SendTOTPUserCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';
import { createUseCaseProvider } from '@shared/utils';
import { UserService } from '../implementations';

export const userProvider: Provider[] = [
  { provide: UserRepository, useClass: UserService },
  createUseCaseProvider(FindUserCase, [UserRepository]),
  createUseCaseProvider(CreateUserCase, [UserRepository, MessageBroker]),
  createUseCaseProvider(GenerateTOTPUserCase, [
    PatientRepository,
    UserRepository,
    Totp,
    MessageBroker,
  ]),
  createUseCaseProvider(VerifyTOTPUserCase, [
    PatientRepository,
    UserRepository,
    Totp,
    MessageBroker,
  ]),
  createUseCaseProvider(SendTOTPUserCase, [SendEmail]),
  createUseCaseProvider(SendResultsUserCase, [
    SendEmail,
    LocalStorage,
    TokenManager,
    PdfManager,
    AllergyDocumentsRepository,
    ClinicalScannedDocumentsRepository,
    GlScannedDocumentsRepository,
    PatientDnrDocumentsRepository,
    PatientDocumentsRepository,
    PatientreFerralDetailDocumentsRepository,
    PurchasingDocumentsRepository,
  ]),
  createUseCaseProvider(DownloadResultUserCase, [TokenManager, LocalStorage]),
];
