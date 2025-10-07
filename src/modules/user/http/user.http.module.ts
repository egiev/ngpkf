import { Module } from '@nestjs/common';
import { UserCoreModule } from '@/modules/user/core';
import { UserHttpController } from './user.controller';

@Module({
  imports: [UserCoreModule],
  controllers: [UserHttpController],
})
export class UserHttpModule {}
