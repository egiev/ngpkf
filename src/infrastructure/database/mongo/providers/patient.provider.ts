import { Provider } from '@nestjs/common';
import { PatientRepository } from '@core/repositories';
import { PatientAdapter } from '@application/adapters';
import {
  CreatePatientCase,
  FindPatientCase,
} from '@application/use-cases/patient';
import { PatientService } from '../implementations';

const useCases: Provider[] = [
  {
    provide: FindPatientCase,
    useFactory: (patientRepository: PatientRepository) =>
      new FindPatientCase(patientRepository),
    inject: [PatientRepository],
  },
  {
    provide: CreatePatientCase,
    useFactory: (patientRepository: PatientRepository) =>
      new CreatePatientCase(patientRepository),
    inject: [PatientRepository],
  },
];

export const patientProvider: Provider[] = [
  { provide: PatientRepository, useClass: PatientService },
  ...useCases,
  {
    provide: PatientAdapter,
    useFactory: (
      findPatientCase: FindPatientCase,
      createPatientCase: CreatePatientCase,
    ) => new PatientAdapter(findPatientCase, createPatientCase),
    inject: [FindPatientCase, CreatePatientCase],
  },
];
