import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthUserCommandModule } from '@/command/auth-user';
import { KafkaCommandModule } from '@/command/kafka';
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
    AuthUserCommandModule,
  ],
})
export class CommandModule {}
