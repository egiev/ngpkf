import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import {
  AllergyDocumentsService,
  ClinicalScannedDocumentsService,
  GlScannedDocumentsService,
  PatientService,
} from '../implementations';

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  { provide: AllergyDocumentsRepository, useClass: AllergyDocumentsService },
  {
    provide: ClinicalScannedDocumentsRepository,
    useClass: ClinicalScannedDocumentsService,
  },
  {
    provide: GlScannedDocumentsRepository,
    useClass: GlScannedDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
