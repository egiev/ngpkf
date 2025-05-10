import { Module } from '@nestjs/common';
// import { OtpConsumerService } from './otp.consumer';
import { MongoModule, patientProvider } from '@infrastructure/database/mongo';
import {
  PostgresModule,
  userProvider,
} from '@infrastructure/database/postgres';
import { FileStorageModule } from '@infrastructure/file-storage';
import { MessageBrokerModule } from '@infrastructure/message-broker';
import { OutboundModule } from '@infrastructure/outbound';
import { emailProvider } from '@infrastructure/outbound/email';
import { TotpModule } from '@infrastructure/totp';
import { OtpResolver } from './otp.resolver';

@Module({
  imports: [
    MongoModule,
    PostgresModule,
    FileStorageModule,
    TotpModule,
    MessageBrokerModule,
    OutboundModule,
  ],
  providers: [
    ...emailProvider,
    ...patientProvider,
    ...userProvider,
    OtpResolver,
  ],
})
export class OtpModule {}
