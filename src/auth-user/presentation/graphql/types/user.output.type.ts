import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  isSuperUser: boolean;

  @Field(() => [String])
  permissions: string[];
}
