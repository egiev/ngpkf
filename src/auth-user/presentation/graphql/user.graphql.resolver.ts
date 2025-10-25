import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserUseCase, GetUsersUseCase } from '@/auth-user/application';
import { CreateUserInput, UserOutput } from '@/auth-user/presentation/graphql/types';
import { UserSerialization } from '@/auth-user/presentation/user.serialization';
import { Response } from '@/common/response/decorators';

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
