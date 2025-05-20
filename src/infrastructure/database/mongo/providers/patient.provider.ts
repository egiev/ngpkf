import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  PatientRepository,
  ScannedDocumentsRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import {
  AllergyDocumentsService,
  ClinicalScannedDocumentsService,
  GlScannedDocumentsService,
  PatientDnrDocumentsService,
  PatientReferralDetailDocumentsService,
  PatientService,
  ScannedDocumentsService,
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
  {
    provide: PatientDnrDocumentsRepository,
    useClass: PatientDnrDocumentsService,
  },
  {
    provide: PatientreFerralDetailDocumentsRepository,
    useClass: PatientReferralDetailDocumentsService,
  },
  {
    provide: ScannedDocumentsRepository,
    useClass: ScannedDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
