import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaCommandModule } from '@/command/kafka';
import { UserCommandModule } from '@/command/user';
import { CommonModule } from '@/common';
import configs from '@/configs';
import { getEnvFilePath } from '@/configs/utils';
import { InfraModule } from '@/infra';

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
