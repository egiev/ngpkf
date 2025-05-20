import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { PurchasingDocumentEntity } from '@core/entities';
import { PurchasingDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { PurchasingDocumenttOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class PurchasingDocumentsService
  extends BaseDocumentService<
    PurchasingDocumenttOrmEntity,
    PurchasingDocumentEntity
  >
  implements PurchasingDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, PurchasingDocumenttOrmEntity);
  }
}
