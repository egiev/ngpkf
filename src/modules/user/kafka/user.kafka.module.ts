import { Module } from '@nestjs/common';
import { UserCoreModule } from '@/modules/user/core';
import { UserKafkaController } from './user.kafka';

@Module({
  imports: [UserCoreModule],
  controllers: [UserKafkaController],
})
export class UserKafkaModule {}
