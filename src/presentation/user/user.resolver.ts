import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAdapter } from '@application/adapters';
import { UserOrmEntity } from '@infrastructure/database/postgres';
import { CreateUserDto } from './dtos';

@Resolver(() => UserOrmEntity)
export class UserResolver {
  constructor(private readonly userAdapter: UserAdapter) {}

  // @Query(() => [User], { name: 'users' })
  // async findAll() {
  //   return await this.userService.findAll();
  // }

  @Query(() => UserOrmEntity, { name: 'user' })
  async findOne(@Args('userId', { type: () => String }) userId: string) {
    return await this.userAdapter.findOne(userId);
  }

  @Mutation(() => UserOrmEntity)
  async createUser(@Args('createUserInput') input: CreateUserDto) {
    return await this.userAdapter.create(input);
  }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('userId', { type: () => String }) userId: string,
  //   @Args('createUserInput') input: UpdateUserDto,
  // ) {
  //   return await this.userService.update(userId, input);
  // }

  // @Mutation(() => Boolean)
  // async removeUser(@Args('userId', { type: () => String }) userId: string) {
  //   await this.userService.remove(userId);
  //   return true;
  // }
}
