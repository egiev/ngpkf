import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property()
  userId!: string;

  @Field()
  @Property()
  totpSecretKey!: string;

  @Field(() => Date)
  @Property({ nullable: true, onUpdate: () => new Date() })
  lastRequestAt?: Date = new Date();

  @Field(() => Date)
  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Field(() => Date)
  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
