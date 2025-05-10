import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ContactOrmEntity } from './contact.entity';
import { ResultOrmEntity } from './result.entity';

@ObjectType()
@Entity({ collection: 'patient' })
export class PatientOrmEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  _id: string = v4();

  @Field()
  @Property()
  mrn: string;

  @Field()
  @Property()
  fullName: string;

  @Field(() => ContactOrmEntity)
  @Embedded(() => ContactOrmEntity)
  contact: ContactOrmEntity;

  @Field(() => [ResultOrmEntity])
  @Embedded(() => ResultOrmEntity)
  results?: ResultOrmEntity[] = [];

  @Field(() => Date)
  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Field(() => Date)
  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
