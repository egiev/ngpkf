import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { PatientDocumentEntity } from '@core/entities';
import { PatientDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { PatientDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class PatientDocumentsService
  extends BaseDocumentService<PatientDocumentOrmEntity, PatientDocumentEntity>
  implements PatientDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, PatientDocumentOrmEntity);
  }
}
