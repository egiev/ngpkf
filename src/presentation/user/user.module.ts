import { Module } from '@nestjs/common';
import { MongoModule, patientProvider } from '@infrastructure/database/mongo';
import {
  PostgresModule,
  userProvider,
} from '@infrastructure/database/postgres';
import { MessageBrokerModule } from '@infrastructure/message-broker';
import { emailProvider } from '@infrastructure/outbound/email';
import { TotpModule } from '@infrastructure/totp';
import { UserResolver } from './user.resolver';

@Module({
  imports: [MongoModule, PostgresModule, TotpModule, MessageBrokerModule],
  providers: [
    ...emailProvider,
    ...patientProvider,
    ...userProvider,
    UserResolver,
  ],
})
export class UserModule {}
