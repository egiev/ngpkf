import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@/modules/user/core/services';
import { UserGraphql } from '@/modules/user/graphql/types';

@Resolver()
export class UserGraphqlResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserGraphql])
  async users() {
    return await this.userService.getUsers();
  }
}
