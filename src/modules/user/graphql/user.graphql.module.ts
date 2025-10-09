import { Module } from '@nestjs/common';
import { UserCoreModule } from '@/modules/user/core';
import { UserGraphqlResolver } from './user.graphql.resolver';

@Module({
  imports: [UserCoreModule],
  providers: [UserGraphqlResolver],
  exports: [UserGraphqlResolver],
})
export class UserGraphqlModule {}
