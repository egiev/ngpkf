import { Injectable } from '@nestjs/common';
import { AuthUser } from '@/auth-user/domain/entities';
import { AuthUserRepositoryPort } from '@/auth-user/domain/ports';
import { UseCase } from '@/common/ddd/use-case';

@Injectable()
export class GetUsersUseCase implements UseCase<undefined, AuthUser[]> {
  constructor(private readonly authUserRepository: AuthUserRepositoryPort) {}

  async execute(): Promise<AuthUser[]> {
    return await this.authUserRepository.getAll();
  }
}
