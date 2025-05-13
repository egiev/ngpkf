import { NotFoundException } from '@nestjs/common';
import { MessageBroker, UseCase } from '@core/abstracts';
import { UserEntity } from '@core/entities';
import { UserConsumerTopic } from '@core/enums';
import { UserRepository } from '@core/repositories';

export class CreateUserCase implements UseCase<UserEntity, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(params: UserEntity): Promise<UserEntity> {
    const user = this.userRepository.create(params);

    if (!user) throw new NotFoundException('Patient not found');

    await this.messageBroker.produce({
      topic: UserConsumerTopic.CREATED,
      messages: [
        {
          value: JSON.stringify(user),
        },
      ],
    });

    return await this.userRepository.create(params);
  }
}
