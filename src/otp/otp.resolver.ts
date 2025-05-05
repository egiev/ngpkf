import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GenerateOTPDto, VerifyOTPDto } from './dto';
import { OtpService } from './otp.service';

@Resolver()
export class OtpResolver {
  constructor(private readonly otpService: OtpService) {}

  @Mutation(() => String)
  async generateOTP(@Args('generateOTPInput') input: GenerateOTPDto) {
    return await this.otpService.generateOTP(input);
  }

  @Mutation(() => String)
  async verifyOTP(@Args('validateOTPInput') input: VerifyOTPDto) {
    return await this.otpService.verifyOTP(input);
  }
}
