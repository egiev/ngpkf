import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { MessageBroker, Totp, UseCase } from '@core/abstracts';
import { UserConsumerTopic } from '@core/enums';
import { PatientRepository, UserRepository } from '@core/repositories';
import { generateUserId } from '@shared/utils';

export class VerifyTOTPUserCase implements UseCase<any, boolean> {
  private readonly secretKey = process.env.SECRET_KEY || '';

  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UserRepository,
    private readonly totp: Totp,
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(params: any): Promise<boolean> {
    try {
      const userId = generateUserId(params.mrn, this.secretKey);
      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isOTPValid = this.totp.verify(params.otp, user.totpSecretKey);

      if (!isOTPValid) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const patient = await this.patientRepository.findOne(params.mrn);

      try {
        await this.messageBroker.produce({
          topic: UserConsumerTopic.VERIFY_OTP,
          messages: [{ value: JSON.stringify(patient) }],
        });
      } catch (error) {
        // TODO: don't use 3rd party on application layer
        // eg: ServiceUnavailableException
        throw new ServiceUnavailableException('Failed to send results');
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'OTP verification failed',
      );
    }
  }
}
