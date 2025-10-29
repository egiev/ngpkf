import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth';
import { AuthUserModule } from '@/auth-user';
import { AuthUserGraphqlResolver } from './auth-user.graphql.resolver';

@Module({
  imports: [AuthModule, AuthUserModule],
  providers: [AuthUserGraphqlResolver],
})
export class AuthUserGraphqlModule {}
