import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { authenticator, totp } from 'otplib';
import { ProducerService } from '../kafka/producer.service';
import { PatientService } from '../patient/patient.service';
import { UserService } from '../user/user.service';
import { GenerateOTPDto } from './dto/generate-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { OTPConsumerTopic } from './otp.enum';
import { generateUserId } from './utils';

totp.options = {
  step: 300,
};

@Injectable()
export class OtpService {
  private readonly secretKey = process.env.SECRET_KEY;

  constructor(
    private readonly producer: ProducerService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
  ) {}

  // TODO: Refactor to follow clean code
  async generateOTP(dto: GenerateOTPDto): Promise<boolean> {
    try {
      const patient = await this.patientService.findOne(dto.mrn);

      const userId = generateUserId(dto.mrn, this.secretKey);

      // Create user
      let user = await this.userService.findOne({ userId });

      if (!user) {
        const totpSecretKey = authenticator.generateSecret();
        user = await this.userService.create({
          userId,
          totpSecretKey,
        });
      }

      // Generate OTP
      const otp = totp.generate(user.totpSecretKey);

      console.log('generate-otp', otp);

      // Send OTP through Kafka
      try {
        await this.producer.produce({
          topic: OTPConsumerTopic.GENERATE_OTP,
          messages: [{ value: otp }],
        });
      } catch (error) {
        throw new ServiceUnavailableException('Failed to send OTP Message');
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Failed to generate OTP',
      );
    }
  }

  // TODO: Refactor to follow clean code
  async verifyOTP(dto: VerifyOTPDto) {
    try {
      const userId = generateUserId(dto.mrn, this.secretKey);

      const user = await this.userService.findOne({ userId });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isOTPValid = totp.verify({
        token: dto.otp,
        secret: user.totpSecretKey,
      });

      if (!isOTPValid) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const patient = await this.patientService.findOne(dto.mrn);
      console.log('verifyOTP', patient);

      await this.producer.produce({
        topic: OTPConsumerTopic.VERIFY_OTP,
        messages: [{ value: JSON.stringify(patient) }],
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'OTP verification failed',
      );
    }
  }
}
