import { Module } from '@nestjs/common';
import { AuthUserModule } from '@/auth-user';
import { AuthUserCreateCommand } from './auth-user.create.command';

@Module({
  imports: [AuthUserModule],
  providers: [AuthUserCreateCommand],
  exports: [AuthUserCreateCommand],
})
export class AuthUserCommandModule {}
