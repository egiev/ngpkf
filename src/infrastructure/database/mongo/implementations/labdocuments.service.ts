import { Injectable } from '@nestjs/common';
import { EntityManager, ObjectId } from '@mikro-orm/mongodb';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { LabDocumentEntity } from '@core/entities';
import { LabDocumentsRepository } from '@core/repositories';
import { Database } from '@infrastructure/database';
import { LabDocumentOrmEntity } from '../entities';
import { BaseDocumentService } from './document.service';

@Injectable()
export class LabDocumentsService
  extends BaseDocumentService<LabDocumentOrmEntity, LabDocumentEntity>
  implements LabDocumentsRepository
{
  constructor(
    @InjectEntityManager(Database.Mongo) protected readonly em: EntityManager,
  ) {
    super(em, LabDocumentOrmEntity);
  }

  override async find(query?: any | undefined): Promise<LabDocumentEntity[]> {
    const date = new Date();
    const rawMonthLimit = process.env.DOCUMENT_MONTHS_LIMIT;
    const monthLimit = rawMonthLimit ? +rawMonthLimit : 0;
    date.setMonth(date.getMonth() - monthLimit);

    const em = this.em.fork();
    const results = await em.findAll(LabDocumentOrmEntity, {
      where: {
        patientuid: new ObjectId(query?.id),
        createdat: { $gte: date },
      },
    });

    return results.map((record) => ({
      ...record,
      id: record._id.toHexString(),
      patientuid: record.patientuid.toHexString(),
    }));
  }
}
