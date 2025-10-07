import { Module } from '@nestjs/common';
import { AuthCoreModule } from '@/modules/auth/core';
import { AuthKafkaController } from './auth.kafka.controller';

@Module({
  imports: [AuthCoreModule],
  controllers: [AuthKafkaController],
})
export class AuthKafkaModule {}
