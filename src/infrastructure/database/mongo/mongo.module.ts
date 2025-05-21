import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import {
  AllergyDocumentOrmEntity,
  ClinicalScannedDocumentOrmEntity,
  ContactOrmEntity,
  GlScannedDocumentOrmEntity,
  LabDocumentOrmEntity,
  PatientDnrDocumentOrmEntity,
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
        PatientDnrDocumentOrmEntity,
        PatientReferralDetailDocumentOrmEntity,
        ScannedDocumentOrmEntity,
        TaskDocumentOrmEntity,
        LabDocumentOrmEntity,
      ],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
