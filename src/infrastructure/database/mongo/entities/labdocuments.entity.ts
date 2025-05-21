import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { LabDocumentObject } from './labdocument';

@ObjectType()
@Entity({ collection: 'labdocuments' })
export class LabDocumentOrmEntity {
  @Field(() => ID)
  @PrimaryKey()
  _id: ObjectId;

  @Field()
  @Property()
  patientuid: ObjectId;

  @Field(() => [LabDocumentObject])
  @Embedded(() => [LabDocumentObject])
  documents: LabDocumentObject[];

  @Field()
  @Property()
  createdat: Date;
}
