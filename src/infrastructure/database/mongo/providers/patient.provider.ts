import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  PatientRepository,
  PurchasingDocumentsRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import {
  AllergyDocumentsService,
  ClinicalScannedDocumentsService,
  GlScannedDocumentsService,
  PatientDnrDocumentsService,
  PatientDocumentsService,
  PatientReferralDetailDocumentsService,
  PatientService,
  PurchasingDocumentsService,
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
  { provide: PatientDocumentsRepository, useClass: PatientDocumentsService },
  {
    provide: PatientreFerralDetailDocumentsRepository,
    useClass: PatientReferralDetailDocumentsService,
  },
  {
    provide: PurchasingDocumentsRepository,
    useClass: PurchasingDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
