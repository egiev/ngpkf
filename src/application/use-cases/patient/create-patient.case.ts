import { NotFoundException } from '@nestjs/common';
import { MessageBroker, UseCase } from '@core/abstracts';
import { PatientEntity } from '@core/entities';
import { PatientConsumerTopic } from '@core/enums';
import { PatientRepository } from '@core/repositories';

export class CreatePatientCase
  implements UseCase<PatientEntity, PatientEntity>
{
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(params: PatientEntity): Promise<PatientEntity> {
    const patient = this.patientRepository.create(params);

    // TODO: don't use 3rd party on application layer
    // eg: NotFoundException
    if (!patient) throw new NotFoundException('Patient not found');

    await this.messageBroker.produce({
      topic: PatientConsumerTopic.CREATE,
      messages: [
        {
          value: JSON.stringify(patient),
        },
      ],
    });

    return patient;
  }
}
