import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseModule } from './database/database.module';
import { OtpModule } from './otp/otp.module';
import { OutboundModule } from './outbound/outbound.module';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    MikroOrmModule.forMiddleware(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    UserModule,
    PatientModule,
    OtpModule,
    OutboundModule,
  ],
})
export class AppModule {}
