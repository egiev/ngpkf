import { Module } from '@nestjs/common';
import { KafkaCommandModule } from '@/command/kafka';
import { UserCommandModule } from '@/command/user';
import { CommonModule } from '@/common/common.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { KafkaModule } from '@/infra/kafka';

@Module({
  imports: [CommonModule, DatabaseModule, KafkaModule, KafkaCommandModule, UserCommandModule],
})
export class CommandModule {}
