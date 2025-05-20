import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { GlScannedDocumentEntity } from '@core/entities';
import { GlScannedDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { GlScannedDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class GlScannedDocumentsService
  extends BaseDocumentService<
    GlScannedDocumentOrmEntity,
    GlScannedDocumentEntity
  >
  implements GlScannedDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, GlScannedDocumentOrmEntity);
  }
}
