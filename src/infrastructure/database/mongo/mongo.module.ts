import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import {
  AllergyDocumentOrmEntity,
  ContactOrmEntity,
  PatientOrmEntity,
} from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(
      [AllergyDocumentOrmEntity, ContactOrmEntity, PatientOrmEntity],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
