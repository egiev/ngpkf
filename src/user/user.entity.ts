import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field(() => Date)
  @Property()
  createdAt = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  email!: string;

  @Field(() => Number, { nullable: true })
  @Property()
  age?: number;
}
