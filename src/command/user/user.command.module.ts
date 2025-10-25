import { Module } from '@nestjs/common';
import { UserModule } from '@/auth-user';
import { UserCreateCommand } from './user.create.command';

@Module({
  imports: [UserModule],
  providers: [UserCreateCommand],
  exports: [UserCreateCommand],
})
export class UserCommandModule {}
