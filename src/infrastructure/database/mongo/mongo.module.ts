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
  PurchasingDocumenttOrmEntity,
} from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature(
      [
        AllergyDocumentOrmEntity,
        ClinicalScannedDocumentOrmEntity,
        ContactOrmEntity,
        PatientOrmEntity,
        GlScannedDocumentOrmEntity,
        PatientDocumentOrmEntity,
        PatientReferralDetailDocumentOrmEntity,
        PurchasingDocumenttOrmEntity,
      ],
      Database.Mongo,
    ),
  ],
})
export class MongoModule {}
