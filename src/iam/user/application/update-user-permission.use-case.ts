import { Injectable } from '@nestjs/common';
import { UpdateUserPermissionsRequest } from '@/iam/user/application/requests';
import { User } from '@/iam/user/domain/entities';
import { UseCase, UserRepositoryPort } from '@/iam/user/domain/ports';
import { PermissionNameVO } from '@/iam/user/domain/value-objects';

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
