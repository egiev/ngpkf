import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ENUM_CONFIG_KEY } from '@/configs';
import { PermissionRepositoryPort } from '@/iam/permission/domain/ports';
import { PermissionEntity } from '@/iam/permission/infrastructure/persistence/entities';
import { MikoormPermissionRepositoryAdapter } from './persistence/adapters/mikroorm.permission.repository.adapter';

@Module({
  imports: [MikroOrmModule.forFeature([PermissionEntity], ENUM_CONFIG_KEY.Postgres)],
  providers: [
    {
      provide: PermissionRepositoryPort,
      useClass: MikoormPermissionRepositoryAdapter,
    },
  ],
  exports: [PermissionRepositoryPort],
})
export class PermissionInfrastructureModule {}
