import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from '@/common/response/decorators';
import { CreateUserUseCase, GetUsersUseCase } from '@/iam/user/application';
import { CreateUserInput, UserOutput } from '@/iam/user/presentation/graphql/types';
import { UserSerialization } from '@/iam/user/presentation/user.serialization';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Response({ serialization: UserSerialization })
  @Query(() => [UserOutput])
  async users() {
    return await this.getUsersUseCase.execute();
  }

  @Response({ serialization: UserSerialization })
  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.createUserUseCase.execute(input);
  }
}
