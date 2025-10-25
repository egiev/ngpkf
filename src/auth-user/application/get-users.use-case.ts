import { Injectable } from '@nestjs/common';
import { User } from '@/auth-user/domain/entities';
import { UserRepositoryPort } from '@/auth-user/domain/ports';
import { UseCase } from '@/common/ddd/use-case';

@Injectable()
export class GetUsersUseCase implements UseCase<undefined, User[]> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
