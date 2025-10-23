import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ENUM_CONFIG_KEY } from '@/configs';
import { UserRepositoryPort } from '@/iam/user/domain/ports';
import { MikroormUserRepositoryAdapter } from '@/iam/user/infrastructure/persistence/adapters/mikroorm.user.repository.adapter';
import { UserEntity } from '@/iam/user/infrastructure/persistence/entities';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity], ENUM_CONFIG_KEY.Postgres)],
  providers: [{ provide: UserRepositoryPort, useClass: MikroormUserRepositoryAdapter }],
  exports: [UserRepositoryPort],
})
export class UserInfrastructureModule {}
