import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    clientId: 'backend',
    brokers: [process.env.KAFKA_BROKER || 'broker:9092'],
    retry: {
      retries: 8,
      initialRetryTime: 300, // ms
      factor: 2, // exponential backoff
    },
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    console.log('#######################################');
    console.log(process.env.KAFKA_BROKER || 'kafka:9092');
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}
