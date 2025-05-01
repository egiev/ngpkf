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
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') input: CreateUserDto) {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('createUserInput') input: UpdateUserDto,
  ) {
    return await this.userService.update(id, input);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    await this.userService.remove(id);
    return true;
  }
}
