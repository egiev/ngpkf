import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database';
import { User } from '../database/postgres/entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User], Database.Postgres)],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
