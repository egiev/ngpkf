import { Module } from '@nestjs/common';
import { UserCoreModule } from '@/modules/user/core';
import { UserCreateCommand } from './user.create.command';

@Module({
  imports: [UserCoreModule],
  providers: [UserCreateCommand],
  exports: [UserCreateCommand],
})
export class UserCommandModule {}
