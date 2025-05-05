import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer.service';
import { EmailService } from '../outbound/email/email.service';
import { OTPConsumerTopic } from './otp.enum';
import { generateOtpEmailMessage } from './utils/generate-email-message.util';

@Injectable()
export class OtpConsumerService implements OnModuleInit {
  constructor(
    private readonly consumer: ConsumerService,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume(
      { topics: [OTPConsumerTopic.GENERATE_OTP] },
      {
        eachMessage: async ({ topic, message, partition }) => {
          console.log(topic, message.value?.toString());
          const content = generateOtpEmailMessage(
            'reginaldventura23@gmail.com',
            message.value!.toString(),
          );
          this.emailService.send(content);
        },
      },
    );
  }
}
