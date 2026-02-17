import { Injectable } from '@nestjs/common';
import { UpdateUserPermissionsRequest } from '@/auth-user/application/requests';
import { AuthUser } from '@/auth-user/domain/entities';
import { AuthUserRepositoryPort } from '@/auth-user/domain/ports';
import { UseCase } from '@/common/ddd';

@Injectable()
export class UpdateUserPermissionsUseCase implements UseCase<UpdateUserPermissionsRequest, AuthUser> {
  constructor(private readonly authUserRepository: AuthUserRepositoryPort) {}

  async execute(params: UpdateUserPermissionsRequest): Promise<AuthUser> {
    const { id, newPermissions } = params;

    const user = await this.authUserRepository.getOneById(id);

    if (!user) {
      // TODO: Creaete exception
      throw new Error('User not found');
    }

    user.setPermissions(newPermissions);

    await this.authUserRepository.save(user);

    return user;
  }
}
