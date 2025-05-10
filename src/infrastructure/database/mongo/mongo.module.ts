import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import { ContactOrmEntity, PatientOrmEntity } from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(
      [PatientOrmEntity, ContactOrmEntity],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
