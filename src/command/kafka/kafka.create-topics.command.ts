import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { KafkaAdminService } from '../../infra/kafka/services/kafka.admin.service';

@Injectable()
@Command({
  name: 'kafka:create-topics',
  description: 'Create kafka topics',
})
export class KafkaCreateTopicCommand extends CommandRunner {
  private readonly logger = new Logger(KafkaCreateTopicCommand.name);

  constructor(private readonly kafkaAdminService: KafkaAdminService) {
    super();
  }

  async run(_passedParams: string[], _options?: Record<string, any>): Promise<void> {
    this.logger.log(`Starting ${KafkaCreateTopicCommand.name} command`);
    await this.kafkaAdminService.createTopics();
    this.logger.log(`${KafkaCreateTopicCommand.name} command finished`);
  }
}
