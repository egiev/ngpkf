import { Field, ObjectType } from '@nestjs/graphql';
import { Embeddable, Property } from '@mikro-orm/core';

@ObjectType()
@Embeddable()
export class ContactOrmEntity {
  @Field()
  @Property()
  homephone?: string;

  @Field()
  @Property()
  mobilephone?: string;

  @Field()
  @Property()
  alternatephone?: string;

  @Field()
  @Property()
  emailid?: string;
}
