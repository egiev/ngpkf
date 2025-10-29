import { Module } from '@nestjs/common';
import { KafkaAdminAdapter } from '@/infra/kafka/adapters';

@Module({
  providers: [KafkaAdminAdapter],
  exports: [KafkaAdminAdapter],
})
export class KafkaAdminModule {}
