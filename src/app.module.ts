import { Module } from '@nestjs/common';
import { GraphqlApiModule, HttpApiModule, KafkaApiModule } from '@/apis';
import { CommonModule } from '@/common/common.module';
import { KafkaModule } from '@/infra/kafka';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    KafkaModule,

    // APIs
    HttpApiModule,
    KafkaApiModule,
    GraphqlApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
