import { Module } from '@nestjs/common';
import { MongoModule } from './mongo';
import { PostgresModule } from './postgres';

@Module({
  imports: [MongoModule, PostgresModule],
  exports: [MongoModule, PostgresModule],
})
export class DatabaseModule {}
