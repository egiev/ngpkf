import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { ContactOrmEntity } from './contact.entity';

@ObjectType()
@Entity({ collection: 'patients' })
export class PatientOrmEntity {
  @Field(() => ID)
  @PrimaryKey()
  _id: ObjectId;

  @Field()
  @Property()
  mrn: string;

  @Field(() => ContactOrmEntity)
  @Embedded(() => ContactOrmEntity)
  contact: ContactOrmEntity;
}
