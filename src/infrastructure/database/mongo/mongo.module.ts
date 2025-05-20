import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database.enum';
import {
  AllergyDocumentOrmEntity,
  ClinicalScannedDocumentOrmEntity,
  ContactOrmEntity,
  GlScannedDocumentOrmEntity,
  PatientDocumentOrmEntity,
  PatientOrmEntity,
  PatientReferralDetailDocumentOrmEntity,
  PurchasingDocumentOrmEntity,
  ScannedDocumentOrmEntity,
} from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(
      [
        AllergyDocumentOrmEntity,
        ClinicalScannedDocumentOrmEntity,
        ContactOrmEntity,
        GlScannedDocumentOrmEntity,
        PatientDocumentOrmEntity,
        PatientOrmEntity,
        PatientReferralDetailDocumentOrmEntity,
        PurchasingDocumentOrmEntity,
        ScannedDocumentOrmEntity,
      ],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
