import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { PatientReferralDetailDocumentEntity } from '@core/entities';
import { PatientreFerralDetailDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { PatientReferralDetailDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class PatientReferralDetailDocumentsService
  extends BaseDocumentService<
    PatientReferralDetailDocumentOrmEntity,
    PatientReferralDetailDocumentEntity
  >
  implements PatientreFerralDetailDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, PatientReferralDetailDocumentOrmEntity);
  }
}
