import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { TaskDocumentEntity } from '@core/entities';
import { TaskDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { TaskDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class TaskDocumentsService
  extends BaseDocumentService<TaskDocumentOrmEntity, TaskDocumentEntity>
  implements TaskDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, TaskDocumentOrmEntity);
  }
}
