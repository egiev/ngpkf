import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { AllergyDocumentEntity } from '@core/entities';
import { AllergyDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { AllergyDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class AllergyDocumentsService
  extends BaseDocumentService<AllergyDocumentOrmEntity, AllergyDocumentEntity>
  implements AllergyDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, AllergyDocumentOrmEntity);
  }
}
