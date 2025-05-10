import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaMessage } from 'kafkajs';
import { MessageBroker } from '@core/abstracts';
import { UserConsumerTopic } from '@core/enums';
import { generateOtpEmailMessage } from '@presentation/otp';
import { UserAdapter } from '@application/adapters';
import { DecodeBase64Pdf } from '@shared/utils';

@Injectable()
export class UserConsumerService implements OnModuleInit {
  constructor(
    private readonly messageBroker: MessageBroker,
    private readonly userAdapter: UserAdapter,
    // private readonly localStorageAdapter: LocalStorageAdapter,
    // private readonly emailSend: SendEmail,
  ) {}

  async onModuleInit() {
    await this.messageBroker.consume(
      {
        topics: [UserConsumerTopic.GENERATE_OTP, UserConsumerTopic.VERIFY_OTP],
      },
      {
        eachMessage: async ({ topic, message, partition }) => {
          switch (topic) {
            case UserConsumerTopic.GENERATE_OTP:
              this.sendOTP(message);
              break;

            case UserConsumerTopic.VERIFY_OTP:
              this.sendResults(message);
              break;
          }
        },
      },
    );
  }

  async sendOTP(message: KafkaMessage): Promise<void> {
    console.log(message.value?.toString(), 'message');
    const content = generateOtpEmailMessage(
      'reginaldventura23@gmail.com',
      message.value!.toString(),
    );
    await this.userAdapter.sendTOTP(content);
  }

  async sendResults(message: KafkaMessage): Promise<void> {
    const { contact, results } = JSON.parse(message.value!.toString());

    const files: DecodeBase64Pdf[] = [];

    // for (const result of results) {
    //   const base64Data = decodeBase64Pdf(result.base64);
    //   const file = await this.localStorageAdapter.upload(base64Data);
    //   files.push(file);
    // }

    // const content = generateSuccessEmailMessage(contact.email, files);
    // await this.emailSend.send(content);
  }
}
