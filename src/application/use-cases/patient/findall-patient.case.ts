import { UseCase } from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { PatientRepository } from '@core/repositories';

export class FindAllPatientCase implements UseCase<string, PatientEntity[]> {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(): Promise<PatientEntity[]> {
    return await this.patientRepository.find();
  }
}
