import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  AuthGroupRepositoryPort,
  AuthPermissionRepositoryPort,
  AuthUserRepositoryPort,
} from '@/auth-user/domain/ports';
import {
  MikoormAuthGroupRepositoryAdapter,
  MikoormAuthPermissionRepositoryAdapter,
  MikroormAuthUserRepositoryAdapter,
} from '@/auth-user/infrastructure/persistence/adapters';
import { AuthGroupEntity, AuthPermissionEntity, AuthUserEntity } from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_CONFIG_KEY } from '@/configs';

@Module({
  imports: [
    MikroOrmModule.forFeature([AuthUserEntity, AuthGroupEntity, AuthPermissionEntity], ENUM_CONFIG_KEY.Postgres),
  ],
  providers: [
    { provide: AuthUserRepositoryPort, useClass: MikroormAuthUserRepositoryAdapter },
    {
      provide: AuthGroupRepositoryPort,
      useClass: MikoormAuthGroupRepositoryAdapter,
    },
    {
      provide: AuthPermissionRepositoryPort,
      useClass: MikoormAuthPermissionRepositoryAdapter,
    },
  ],
  exports: [AuthUserRepositoryPort, AuthGroupRepositoryPort, AuthPermissionRepositoryPort],
})
export class AuthUserInfrastructureModule {}
