import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { KafkaMessage } from 'kafkajs';
import { MessageBroker } from '@core/abstracts';
import { UserConsumerTopic } from '@core/enums';
import { SendResultsUserCase, SendTOTPUserCase } from '@application/use-cases';

@Injectable()
export class UserConsumerService implements OnModuleInit {
  private mapper: Record<UserConsumerTopic, (args?: any) => Promise<any>>;

  constructor(
    private readonly messageBroker: MessageBroker,
    private readonly sendTOTPUserCase: SendTOTPUserCase,
    private readonly sendResultsUserCase: SendResultsUserCase,
  ) {
    this.mapper = {
      [UserConsumerTopic.GENERATE_OTP]: (args) => this.sendTOTP(args),
      [UserConsumerTopic.VERIFY_OTP]: (args) => this.sendResults(args),
    };
  }

  async onModuleInit(): Promise<void> {
    await this.messageBroker.consume(
      {
        topics: [UserConsumerTopic.GENERATE_OTP, UserConsumerTopic.VERIFY_OTP],
      },
      {
        eachMessage: async ({ topic, message, partition }) => {
          try {
            const handler = this.mapper[topic];

            if (!handler)
              throw new InternalServerErrorException('No hanlder defined.');

            await handler(message);
          } catch (error) {
            throw new InternalServerErrorException(
              `Error proccessing topic ${topic}`,
            );
          }
        },
      },
    );
  }

  async sendTOTP(message: KafkaMessage): Promise<void> {
    const content = JSON.parse(message.value!.toString());
    console.log(content, 'sendTOTP');
    await this.sendTOTPUserCase.execute(content);
  }

  async sendResults(message: KafkaMessage): Promise<void> {
    const content = JSON.parse(message.value!.toString());
    console.log(content, 'sendResults');
    await this.sendResultsUserCase.execute(content);
  }
}
