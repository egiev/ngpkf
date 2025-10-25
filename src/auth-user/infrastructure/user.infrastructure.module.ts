import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GroupRepositoryPort, PermissionRepositoryPort, UserRepositoryPort } from '@/auth-user/domain/ports';
import {
  MikoormGroupRepositoryAdapter,
  MikoormPermissionRepositoryAdapter,
  MikroormUserRepositoryAdapter,
} from '@/auth-user/infrastructure/persistence/adapters';
import { GroupEntity, PermissionEntity, UserEntity } from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_CONFIG_KEY } from '@/configs';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, GroupEntity, PermissionEntity], ENUM_CONFIG_KEY.Postgres)],
  providers: [
    { provide: UserRepositoryPort, useClass: MikroormUserRepositoryAdapter },
    {
      provide: GroupRepositoryPort,
      useClass: MikoormGroupRepositoryAdapter,
    },
    {
      provide: PermissionRepositoryPort,
      useClass: MikoormPermissionRepositoryAdapter,
    },
  ],
  exports: [UserRepositoryPort, PermissionRepositoryPort],
})
export class UserInfrastructureModule {}
