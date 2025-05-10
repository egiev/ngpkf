import { Module } from '@nestjs/common';
import { MongoModule, patientProvider } from './database/mongo';
import { PostgresModule, userProvider } from './database/postgres';
import { FileStorageModule } from './file-storage';
import { MessageBrokerModule } from './message-broker';
import { OutboundModule } from './outbound';
import { TotpModule } from './totp';

@Module({
  imports: [
    OutboundModule,
    TotpModule,
    MessageBrokerModule,
    FileStorageModule,
    MongoModule,
    PostgresModule,
  ],
  providers: [...userProvider, ...patientProvider],
  exports: [
    OutboundModule,
    TotpModule,
    MessageBrokerModule,
    FileStorageModule,
    MongoModule,
    PostgresModule,
    ...userProvider,
    ...patientProvider,
  ],
})
export class InfrastructureModule {}
