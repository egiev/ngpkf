import { UseCase } from '@core/abstracts';
import { UserEntity } from '@core/entities';
import { UserRepository } from '@core/repositories';

export class CreateUserCase implements UseCase<UserEntity, UserEntity> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: UserEntity): Promise<UserEntity> {
    return await this.userRepository.create(params);
  }
}
