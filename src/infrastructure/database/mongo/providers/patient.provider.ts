import { Provider } from '@nestjs/common';
import {
  AllergyDocumentsRepository,
  ClinicalScannedDocumentsRepository,
  GlScannedDocumentsRepository,
  LabDocumentsRepository,
  PatientDnrDocumentsRepository,
  PatientreFerralDetailDocumentsRepository,
  PatientRepository,
  ScannedDocumentsRepository,
  TaskDocumentsRepository,
} from '@core/repositories';
import { FindPatientCase } from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import {
  AllergyDocumentsService,
  ClinicalScannedDocumentsService,
  GlScannedDocumentsService,
  LabDocumentsService,
  PatientDnrDocumentsService,
  PatientReferralDetailDocumentsService,
  PatientService,
  ScannedDocumentsService,
  TaskDocumentsService,
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
  {
    provide: TaskDocumentsRepository,
    useClass: TaskDocumentsService,
  },
  {
    provide: LabDocumentsRepository,
    useClass: LabDocumentsService,
  },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
];
