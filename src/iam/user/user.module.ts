import { Module } from '@nestjs/common';
import { CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase } from '@/iam/user/application';
import { UserInfrastructureModule } from '@/iam/user/infrastructure/user.infrastructure.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule, UserInfrastructureModule],
  providers: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
  exports: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
})
export class UserModule {}
