import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { MessageBroker, Totp, UseCase } from '@core/abstracts';
import { UserConsumerTopic } from '@core/enums';
import { PatientRepository, UserRepository } from '@core/repositories';
import { generateUserId } from '@shared/utils';

export class GenerateTOTPUserCase implements UseCase<string, boolean> {
  private readonly secretKey = process.env.SECRET_KEY || '';

  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UserRepository,
    private readonly totp: Totp,
    private readonly messageBroker: MessageBroker,
  ) {}

  async execute(params: string): Promise<boolean> {
    const patient = await this.patientRepository.findOne(params);
    // TODO: don't use 3rd party on application layer
    // eg: NotFoundException
    if (!patient) throw new NotFoundException('Patient not found');

    const userId = generateUserId(patient.mrn, this.secretKey);

    let user = await this.userRepository.findOne(userId);
    if (!user) {
      const totpSecretKey = this.totp.generateSecret();
      user = await this.userRepository.create({
        userId,
        totpSecretKey,
      });
    }

    // Generate TOTP
    const totp = this.totp.generate(user.totpSecretKey);

    try {
      await this.messageBroker.produce({
        topic: UserConsumerTopic.GENERATE_OTP,
        messages: [
          {
            value: JSON.stringify({
              to: patient.contact.email,
              totp,
            }),
          },
        ],
      });
    } catch (error) {
      // TODO: don't use 3rd party on application layer
      // eg: ServiceUnavailableException
      throw new ServiceUnavailableException('Failed to send OTP Message');
    }

    return true;
  }
}
