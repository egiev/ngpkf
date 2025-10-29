import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { KafkaModule } from '@/infra/kafka';

@Module({
  imports: [DatabaseModule, KafkaModule],
  exports: [DatabaseModule, KafkaModule],
})
export class InfraModule {}
