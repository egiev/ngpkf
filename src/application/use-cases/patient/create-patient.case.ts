import { UseCase } from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { PatientRepository } from '@core/repositories';

export class CreatePatientCase
  implements UseCase<PatientEntity, PatientEntity>
{
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(params: PatientEntity): Promise<PatientEntity> {
    return await this.patientRepository.create(params);
  }
}
