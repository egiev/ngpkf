import { Module } from '@nestjs/common';
import { KafkaAdminModule } from '@/infra/kafka';
import { KafkaCreateTopicCommand } from './kafka.create-topics.command';

@Module({
  imports: [KafkaAdminModule],
  providers: [KafkaCreateTopicCommand],
  exports: [KafkaCreateTopicCommand],
})
export class KafkaCommandModule {}
