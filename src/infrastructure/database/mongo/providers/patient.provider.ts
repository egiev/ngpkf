import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  PatientRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import { AllergyDocumentsService, PatientService } from '../implementations';

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  { provide: AllergyDocumentsRepository, useClass: AllergyDocumentsService },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
