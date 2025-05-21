import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import {
  AllergyDocumentOrmEntity,
  ClinicalScannedDocumentOrmEntity,
  ContactOrmEntity,
  GlScannedDocumentOrmEntity,
  PatientOrmEntity,
  PatientReferralDetailDocumentOrmEntity,
  ScannedDocumentOrmEntity,
  TaskDocumentOrmEntity,
} from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(
      [
        AllergyDocumentOrmEntity,
        ClinicalScannedDocumentOrmEntity,
        ContactOrmEntity,
        GlScannedDocumentOrmEntity,
        PatientOrmEntity,
        PatientReferralDetailDocumentOrmEntity,
        ScannedDocumentOrmEntity,
        TaskDocumentOrmEntity,
      ],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
