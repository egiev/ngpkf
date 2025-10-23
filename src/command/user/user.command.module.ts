import { Module } from '@nestjs/common';
import { UserModule } from '@/iam/user/user.module';
import { UserCreateCommand } from './user.create.command';

@Module({
  imports: [UserModule],
  providers: [UserCreateCommand],
  exports: [UserCreateCommand],
})
export class UserCommandModule {}
