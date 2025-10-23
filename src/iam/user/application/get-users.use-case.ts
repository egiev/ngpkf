import { Injectable } from '@nestjs/common';
import { UseCase } from '@/common/ddd/use-case';
import { User } from '@/iam/user/domain/entities';
import { UserRepositoryPort } from '@/iam/user/domain/ports';

@Injectable()
export class GetUsersUseCase implements UseCase<undefined, User[]> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
