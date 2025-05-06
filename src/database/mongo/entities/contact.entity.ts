import { Field, ObjectType } from '@nestjs/graphql';
import { Embeddable, Property } from '@mikro-orm/core';

@ObjectType()
@Embeddable()
export class Contact {
  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  mobile!: string;
}
