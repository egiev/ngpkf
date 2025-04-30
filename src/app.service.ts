import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producer: ProducerService) {}

  async getHello(): Promise<string> {
    await this.producer.produce({
      topic: 'test-topic',
      messages: [{ value: 'hello' }],
    });

    console.log('produce');
    return 'Hello World!';
  }
}
