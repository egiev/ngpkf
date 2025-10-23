import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ENUM_CONFIG_KEY } from '@/configs';
import { GroupRepositoryPort } from '@/iam/group/domain/ports';
import { MikoormGroupRepositoryAdapter } from '@/iam/group/infrastructure/persistence/adapters/mikroorm.group.repository.adapter';
import { GroupEntity } from '@/iam/group/infrastructure/persistence/entities';

@Module({
  imports: [MikroOrmModule.forFeature([GroupEntity], ENUM_CONFIG_KEY.Postgres)],
  providers: [
    {
      provide: GroupRepositoryPort,
      useClass: MikoormGroupRepositoryAdapter,
    },
  ],
  exports: [GroupRepositoryPort],
})
export class GroupInfrastructureModule {}
