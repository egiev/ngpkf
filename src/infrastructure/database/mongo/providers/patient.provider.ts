import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  PatientRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import {
  AllergyDocumentsService,
  ClinicalScannedDocumentsService,
  PatientService,
} from '../implementations';

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  { provide: AllergyDocumentsRepository, useClass: AllergyDocumentsService },
  {
    provide: ClinicalScannedDocumentsRepository,
    useClass: ClinicalScannedDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
