import { Injectable } from '@nestjs/common';
import { UpdateUserPermissionsRequest } from '@/auth-user/application/requests';
import { User } from '@/auth-user/domain/entities';
import { UserRepositoryPort } from '@/auth-user/domain/ports';
import { PermissionNameVO } from '@/auth-user/domain/value-objects';
import { UseCase } from '@/common/ddd';

@Injectable()
export class UpdateUserPermissionsUseCase implements UseCase<UpdateUserPermissionsRequest, User> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(params: UpdateUserPermissionsRequest): Promise<User> {
    const { id, newPermissions } = params;

    const user = await this.userRepository.getOneById(id);

    if (!user) {
      // TODO: Creaete exception
      throw new Error('User not found');
    }

    const newPermissionVOs = newPermissions.map((permission) => PermissionNameVO.create(permission));

    user.setPermissions(newPermissionVOs);

    await this.userRepository.save(user);

    return user;
  }
}
