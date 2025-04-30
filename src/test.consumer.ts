import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumer: ConsumerService) {}

  async onModuleInit() {
    await this.consumer.consume(
      { topics: ['test-topic'] },
      {
        eachMessage: async ({ topic, message, partition }) => {
          console.log('do async task');
          console.log(topic, message, partition);
        },
      },
    );
  }
}
