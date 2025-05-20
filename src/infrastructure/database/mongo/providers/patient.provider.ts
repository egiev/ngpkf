import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  PatientRepository,
  PurchasingDocumentsRepository,
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
  PurchasingDocumentsService,
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
    provide: PurchasingDocumentsRepository,
    useClass: PurchasingDocumentsService,
  },
  {
    provide: ScannedDocumentsRepository,
    useClass: ScannedDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
