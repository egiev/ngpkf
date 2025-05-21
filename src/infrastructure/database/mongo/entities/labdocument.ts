import { Field, ObjectType } from '@nestjs/graphql';
import { Embeddable, Property } from '@mikro-orm/core';

@ObjectType()
@Embeddable()
export class LabDocumentObject {
  @Field()
  @Property()
  document: string;

  @Field()
  @Property()
  documentname: string;

  @Field()
  @Property()
  documenttype: string;
}
