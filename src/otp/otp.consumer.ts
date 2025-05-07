import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaMessage } from 'kafkajs';
import { ConsumerService } from '../kafka/consumer.service';
import { EmailService } from '../outbound/email/email.service';
import { saveBase64Pdf } from '../utils/generate-pdf.util';
import { OTPConsumerTopic } from './otp.enum';
import { generateSuccessEmailMessage } from './utils';
import { generateOtpEmailMessage } from './utils/generate-email-message.util';

@Injectable()
export class OtpConsumerService implements OnModuleInit {
  constructor(
    private readonly consumer: ConsumerService,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume(
      { topics: [OTPConsumerTopic.GENERATE_OTP, OTPConsumerTopic.VERIFY_OTP] },
      {
        eachMessage: async ({ topic, message, partition }) => {
          switch (topic) {
            case OTPConsumerTopic.GENERATE_OTP:
              this.sendOTP(message);
              break;
            case OTPConsumerTopic.VERIFY_OTP:
              this.sendResults(message);
              break;
          }
        },
      },
    );
  }

  async sendOTP(message: KafkaMessage): Promise<void> {
    const content = generateOtpEmailMessage(
      'reginaldventura23@gmail.com',
      message.value!.toString(),
    );
    await this.emailService.send(content);
  }

  async sendResults(message: KafkaMessage): Promise<void> {
    const { contact, results } = JSON.parse(message.value!.toString());

    const files: {
      filePath: string;
      filename: string;
    }[] = [];

    for (const result of results) {
      console.log('############################');
      console.log(result);
      console.log(result.base64);
      console.log('############################');
      const file = await saveBase64Pdf(result.base64);
      console.log('fileeeeeeeeeeeeeeeeeeee');
      console.log(file);
      files.push(file);
    }

    const content = generateSuccessEmailMessage(contact.email, files);
    await this.emailService.send(content);
    console.log('DONE GENERATING PDFs');
  }
}
