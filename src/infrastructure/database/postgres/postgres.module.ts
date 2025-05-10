import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import { UserOrmEntity } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([UserOrmEntity], Database.Postgres)],
  exports: [MikroOrmModule],
})
export class PostgresModule {}
