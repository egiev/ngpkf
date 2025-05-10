import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FileModule } from '@presentation/file';
import { OtpModule } from '@presentation/otp';
import { PatientModule } from '@presentation/patient';
import { UserModule } from '@presentation/user';
import { DatabaseModule } from '@infrastructure/database';
import { OutboundModule } from '@infrastructure/outbound';
import { TotpModule } from './infrastructure/totp/totp.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    UserModule,
    PatientModule,
    OtpModule,
    FileModule,
    OutboundModule,
    TotpModule,
  ],
})
export class AppModule {}
