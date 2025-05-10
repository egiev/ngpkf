import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
  Producer,
  ProducerRecord,
} from 'kafkajs';
import { MessageBroker } from '@core/abstracts';

@Injectable()
export class KafkaService
  implements OnModuleInit, OnApplicationShutdown, MessageBroker
{
  private readonly kafka = new Kafka({
    clientId: 'backend',
    brokers: [process.env.KAFKA_BROKER || 'broker:9092'],
    retry: {
      retries: 8,
      initialRetryTime: 300,
      factor: 2,
    },
  });
  private readonly producer: Producer = this.kafka.producer();
  private readonly consumers: Consumer[] = [];

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();

    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
