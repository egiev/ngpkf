import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { ScannedDocumentEntity } from '@core/entities';
import { ScannedDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { ScannedDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class ScannedDocumentsService
  extends BaseDocumentService<ScannedDocumentOrmEntity, ScannedDocumentEntity>
  implements ScannedDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, ScannedDocumentOrmEntity);
  }
}
