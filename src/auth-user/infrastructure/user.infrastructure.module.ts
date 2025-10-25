import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GroupRepositoryPort, UserRepositoryPort } from '@/auth-user/domain/ports';
import { PermissionRepositoryPort } from '@/auth-user/domain/ports/permission.repository.port';
import { MikoormGroupRepositoryAdapter } from '@/auth-user/infrastructure/persistence/adapters/mikroorm.group.repository.adapter';
import { MikoormPermissionRepositoryAdapter } from '@/auth-user/infrastructure/persistence/adapters/mikroorm.permission.repository.adapter';
import { MikroormUserRepositoryAdapter } from '@/auth-user/infrastructure/persistence/adapters/mikroorm.user.repository.adapter';
import { GroupEntity, UserEntity } from '@/auth-user/infrastructure/persistence/entities';
import { PermissionEntity } from '@/auth-user/infrastructure/persistence/entities/permission.entity';
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
