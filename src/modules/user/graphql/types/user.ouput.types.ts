import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseUser } from '@/modules/user/core/abstracts';

@ObjectType()
export class UserGraphql implements BaseUser {
  @Field(() => ID)
  id: string;
}
