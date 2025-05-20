import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@ObjectType({ isAbstract: true })
export abstract class BaseDocumentOrmEntity {
  @Field(() => ID)
  @PrimaryKey()
  _id: ObjectId;

  @Field()
  @Property()
  patientuid: ObjectId;

  @Field()
  @Property()
  documentname: string;

  @Field()
  @Property()
  scanneddocument: Buffer;

  @Field()
  @Property()
  createdat: Date;
}
