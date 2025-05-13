import { Provider } from '@nestjs/common';
import { MessageBroker } from '@core/abstracts';
import { PatientRepository } from '@core/repositories';
import {
  CreatePatientCase,
  FindPatientCase,
} from '@application/use-cases/patient';
import { createUseCaseProvider } from '@shared/utils';
import { PatientService } from '../implementations';

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  createUseCaseProvider(FindPatientCase, [PatientRepository]),
  createUseCaseProvider(CreatePatientCase, [PatientRepository, MessageBroker]),
];
