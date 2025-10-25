import { Module } from '@nestjs/common';
import { CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase } from '@/auth-user/application';
import { UserInfrastructureModule } from '@/auth-user/infrastructure/user.infrastructure.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule, UserInfrastructureModule],
  providers: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
  exports: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
})
export class UserModule {}
