import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { ClinicalScannedDocumentEntity } from '@core/entities';
import { ClinicalScannedDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { ClinicalScannedDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class ClinicalScannedDocumentsService
  extends BaseDocumentService<
    ClinicalScannedDocumentOrmEntity,
    ClinicalScannedDocumentEntity
  >
  implements ClinicalScannedDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, ClinicalScannedDocumentOrmEntity);
  }
}
