import { PatientEntity } from '@core/entities';
import {
  CreatePatientCase,
  FindPatientCase,
} from '@application/use-cases/patient';

export class PatientAdapter {
  constructor(
    private readonly findPatientCase: FindPatientCase,
    private readonly createPatientCase: CreatePatientCase,
  ) {}

  findOne(params: string) {
    return this.findPatientCase.execute(params);
  }

  create(params: PatientEntity) {
    return this.createPatientCase.execute(params);
  }
}
