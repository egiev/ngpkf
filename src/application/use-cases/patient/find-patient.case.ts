import { NotFoundException } from '@nestjs/common';
import { UseCase } from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { PatientRepository } from '@core/repositories';

export class FindPatientCase implements UseCase<string, PatientEntity> {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(params: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne(params);

    // TODO: dont use 3rd party on application layer
    if (!patient) throw new NotFoundException('Patient not found');

    return patient;
  }
}
