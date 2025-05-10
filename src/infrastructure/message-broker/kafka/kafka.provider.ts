import { Provider } from '@nestjs/common';
import { MessageBroker } from '@core/abstracts';
import { KafkaService } from './kafka.service';

export const kafkaProvider: Provider[] = [
  {
    provide: MessageBroker,
    useClass: KafkaService,
  },
];
