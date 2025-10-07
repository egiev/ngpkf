import { Module } from '@nestjs/common';
import { HttpApiModule, KafkaApiModule } from '@/apis';
import { CommonModule } from '@/common/common.module';
import { KafkaModule } from '@/infra/kafka';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [CommonModule, DatabaseModule, KafkaModule, HttpApiModule, KafkaApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
