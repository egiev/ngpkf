import { Entity, PrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'sample' })
export class SampleOrmEntity {
  @PrimaryKey()
  _id: ObjectId;
}
