import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ENUM_DATABASE } from '@/common/database/constants';
import { UserController } from '@/modules/user/controllers';
import { UserEntity } from '@/modules/user/entities';
import { UserRepository } from '@/modules/user/repositories';
import { UserService } from '@/modules/user/services';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity], ENUM_DATABASE.Postgres)],
  providers: [UserRepository, UserService],
  exports: [],
  controllers: [UserController],
})
export class UserModule {}
