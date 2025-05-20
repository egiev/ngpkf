import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { PatientDnrDocumentEntity } from '@core/entities';
import { PatientDnrDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { PatientDnrDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class PatientDnrDocumentsService
  extends BaseDocumentService<
    PatientDnrDocumentOrmEntity,
    PatientDnrDocumentEntity
  >
  implements PatientDnrDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, PatientDnrDocumentOrmEntity);
  }
}
