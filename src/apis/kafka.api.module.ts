import { Module } from '@nestjs/common';
import { AuthKafkaModule } from '@/modules/auth/kafka';
import { UserKafkaModule } from '@/modules/user/kafka';

@Module({
  imports: [AuthKafkaModule, UserKafkaModule],
})
export class KafkaApiModule {}
