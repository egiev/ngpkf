import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserAdapter } from '@application/adapters';
import { GenerateOTPDto, VerifyOTPDto } from './dtos';

@Resolver()
export class OtpResolver {
  constructor(private readonly userAdapter: UserAdapter) {}

  @Mutation(() => String)
  async generateOTP(@Args('generateOTPInput') input: GenerateOTPDto) {
    console.log(input.mrn);
    return await this.userAdapter.generateTOTP(input.mrn);
  }

  @Mutation(() => String)
  async verifyOTP(@Args('validateOTPInput') input: VerifyOTPDto) {
    return await this.userAdapter.verifyTOTP(input);
  }
}
