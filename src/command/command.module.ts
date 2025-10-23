import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaCommandModule } from '@/command/kafka';
import { CommonModule } from '@/common/common.module';
import configs from '@/configs';
import { getEnvFilePath } from '@/configs/utils';
import { InfraModule } from '@/infra/infra.module';
import { UserCommandModule } from './user/user.command.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: configs,
      expandVariables: true,
    }),
    CommonModule,
    InfraModule,
    KafkaCommandModule,
    UserCommandModule,
  ],
})
export class CommandModule {}
