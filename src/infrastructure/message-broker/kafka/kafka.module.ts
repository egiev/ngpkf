import { Module } from '@nestjs/common';
import { MessageBroker } from '@core/abstracts';
import { patientProvider } from '@infrastructure/database/mongo';
import { userProvider } from '@infrastructure/database/postgres';
import { emailProvider } from '@infrastructure/outbound/email';
import { totpProvider } from '@infrastructure/totp';
import { UserConsumerService } from './consumers';
import { kafkaProvider } from './kafka.provider';

@Module({
  providers: [
    ...patientProvider,
    ...userProvider,
    ...totpProvider,
    ...kafkaProvider,
    ...emailProvider,
    UserConsumerService,
  ],
  exports: [MessageBroker],
})
export class KafkaModule {}
