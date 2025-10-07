import { Module } from '@nestjs/common';
import { UserKafkaModule } from '@/modules/user/kafka';

@Module({
  imports: [UserKafkaModule],
})
export class KafkaApiModule {}
