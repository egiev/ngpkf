import { Module } from '@nestjs/common';
import { KafkaAdminService } from '@/infra/kafka/services';

@Module({
  providers: [KafkaAdminService],
  exports: [KafkaAdminService],
})
export class KafkaAdminModule {}
