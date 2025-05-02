import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@ObjectType()
@Entity({ collection: 'patient' })
export class Patient {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  _id: string = v4();

  @Field()
  @Property()
  mrn!: string;

  @Field(() => Date)
  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Field(() => Date)
  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
