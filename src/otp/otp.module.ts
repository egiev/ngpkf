import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Database } from '../database';
import { User } from '../database/postgres';
import { KafkaModule } from '../kafka/kafka.module';
import { OutboundModule } from '../outbound/outbound.module';
import { UserModule } from '../user/user.module';
import { OtpConsumerService } from './otp.consumer';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([User], Database.Postgres),
    UserModule,
    KafkaModule,
    OutboundModule,
  ],
  providers: [OtpService, OtpResolver, OtpConsumerService],
})
export class OtpModule {}
