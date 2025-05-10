import { NotFoundException } from '@nestjs/common';
import { UseCase } from '@core/abstracts';
import { UserEntity } from '@core/entities';
import { UserRepository } from '@core/repositories';

export class FindUserCase implements UseCase<string, UserEntity> {
  constructor(private readonly userRespository: UserRepository) {}

  async execute(params: string): Promise<UserEntity> {
    const user = await this.userRespository.findOne(params);

    if (!user) throw new NotFoundException('Patient not found');

    return user;
  }
}
