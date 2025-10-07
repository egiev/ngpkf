import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ENUM_DATABASE } from '@/common/database/constants';
import { UserEntity } from '@/modules/user/core/entities';
import { UserRepository } from '@/modules/user/core/repositories';
import { UserService } from '@/modules/user/core/services';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity], ENUM_DATABASE.Postgres)],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserCoreModule {}
