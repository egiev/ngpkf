import { Module } from '@nestjs/common';
import { kafkaProvider } from './kafka.provider';

@Module({
  providers: [...kafkaProvider],
  exports: [...kafkaProvider],
})
export class KafkaModule {}
