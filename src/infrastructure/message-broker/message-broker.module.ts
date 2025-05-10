import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka';

@Module({
  imports: [KafkaModule],
  exports: [KafkaModule],
})
export class MessageBrokerModule {}
