import { Module } from '@nestjs/common';
import { CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase } from '@/auth-user/application';
import { UserInfrastructureModule } from '@/auth-user/infrastructure';
import { CommonModule } from '@/common';

@Module({
  imports: [CommonModule, UserInfrastructureModule],
  providers: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
  exports: [CreateUserUseCase, GetUsersUseCase, UpdateUserPermissionsUseCase],
})
export class UserModule {}
