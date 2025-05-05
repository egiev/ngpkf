import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../database/postgres/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('userId', { type: () => String }) userId: string) {
    return await this.userService.findOne({ userId });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') input: CreateUserDto) {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId', { type: () => String }) userId: string,
    @Args('createUserInput') input: UpdateUserDto,
  ) {
    return await this.userService.update(userId, input);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('userId', { type: () => String }) userId: string) {
    await this.userService.remove(userId);
    return true;
  }
}
