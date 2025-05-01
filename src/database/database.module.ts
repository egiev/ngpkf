import { Module } from '@nestjs/common';
// import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  exports: [PostgresModule],
})
export class DatabaseModule {}
