import { EntityManager, EntityName, ObjectId } from '@mikro-orm/mongodb';

export class BaseDocumentService<
  OrmEntity extends { _id: ObjectId; patientuid: ObjectId },
  DomainEntity,
> {
  constructor(
    protected readonly em: EntityManager,
    protected readonly entity: EntityName<OrmEntity>,
  ) {}

  async find(query?: any | undefined): Promise<DomainEntity[]> {
    const date = new Date();
    const rawMonthLimit = process.env.DOCUMENT_MONTHS_LIMIT;
    const monthLimit = rawMonthLimit ? +rawMonthLimit : 0;
    date.setMonth(date.getMonth() - monthLimit);

    const em = this.em.fork();
    const results = (await em.findAll(this.entity as any, {
      where: {
        patientuid: new ObjectId(query?.id),
        createdat: { $gte: date },
      },
    })) as any;

    return results.map((record) => ({
      ...record,
      id: record._id.toHexString(),
      patientuid: record.patientuid.toHexString(),
      scanneddocument: record.scanneddocument.toString('base64'),
    }));
  }

  findOne(id: string): Promise<DomainEntity | null> {
    throw new Error('Method not implemented.');
  }

  create(item: DomainEntity): Promise<DomainEntity> {
    throw new Error('Method not implemented.');
  }

  update(id: string, item: DomainEntity): Promise<DomainEntity | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
