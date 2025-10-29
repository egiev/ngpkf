import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Admin, ITopicConfig, Kafka, KafkaConfig } from 'kafkajs';
import { ENUM_CONFIG_KEY } from '@/configs';
import { KafkaCreateTopics } from '@/infra/kafka/constants';
import { KafkaAdminPort } from '@/infra/kafka/ports';

@Injectable()
export class KafkaAdminAdapter implements KafkaAdminPort, OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly admin: Admin;
  private readonly topics: string[];

  private readonly logger = new Logger(KafkaAdminAdapter.name);

  constructor(private readonly configService: ConfigService) {
    const config: KafkaConfig | undefined = this.configService.get(ENUM_CONFIG_KEY.Kafka);

    if (!config) throw new Error(`Missing Kafka config`);

    this.kafka = new Kafka(config);
    this.admin = this.kafka.admin();

    this.topics = KafkaCreateTopics;
  }
  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async connect(): Promise<void> {
    this.logger.log(`Connecting ${KafkaAdminAdapter.name} Admin`);
    await this.admin.connect();
    this.logger.log(`${KafkaAdminAdapter.name} Admin Connected`);
  }

  async disconnect(): Promise<void> {
    this.logger.log(`Disconnecting ${KafkaAdminAdapter.name} Admin`);
    await this.admin.connect();
    this.logger.log(`${KafkaAdminAdapter.name} Admin Disconnected`);
  }

  async getAllTopic(): Promise<string[]> {
    return await this.admin.listTopics();
  }

  async createTopics(): Promise<void> {
    this.logger.log(`Topics ${this.topics.toString()}`);

    const currentTopics = await this.getAllTopic();
    const topics: ITopicConfig[] = [];

    for (const topic of this.topics) {
      if (!currentTopics.includes(topic)) {
        topics.push({ topic, numPartitions: 3, replicationFactor: 1 });
      }
    }

    if (topics.length > 0) {
      await this.admin.createTopics({ topics, waitForLeaders: true });
    }

    this.logger.log(`Topics created`);

    return;
  }
}
