import { Provider } from '@nestjs/common';
import { MessageBroker } from '@core/abstracts';
import {
  AllergyDocumentsRepository,
  PatientRepository,
} from '@core/repositories';
import {
  CreatePatientCase,
  FindAllPatientCase,
  FindPatientCase,
} from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import { AllergyDocumentsService, PatientService } from '../implementations';

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  { provide: AllergyDocumentsRepository, useClass: AllergyDocumentsService },
  createUseCaseProvider(FindAllPatientCase, [PatientRepository]),
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
  createUseCaseProvider(CreatePatientCase, [PatientRepository, MessageBroker]),
];
