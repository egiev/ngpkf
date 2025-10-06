import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaCreateTopicCommand } from '@/command/kafka';
import config from '@/config';
import { getEnvFilePath } from '@/config/utils';
import { KafkaAdminModule } from '@/infra/kafka/kafka.admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: config,
      expandVariables: true,
    }),
    KafkaAdminModule,
  ],
  providers: [KafkaCreateTopicCommand],
  exports: [KafkaCreateTopicCommand],
})
export class CommandModule {}
