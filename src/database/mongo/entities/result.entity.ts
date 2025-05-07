import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Embeddable, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@ObjectType()
@Embeddable()
export class Result {
  @Field(() => ID)
  @Property({ type: 'uuid' })
  _id: string = v4();

  @Field()
  @Property()
  base64: string;
}
