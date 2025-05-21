import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  GenerateTOTPUserCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';
import { UserOrmEntity } from '@infrastructure/database/postgres';
import { GenerateOTPDto, VerifyOTPDto } from './dtos';

@Resolver(() => UserOrmEntity)
export class UserResolver {
  constructor(
    private readonly generateTOTPUserCase: GenerateTOTPUserCase,
    private readonly verifyTOTPUserCase: VerifyTOTPUserCase,
  ) {}

  @Mutation(() => String)
  async generateOTP(@Args('generateOTPInput') input: GenerateOTPDto) {
    return await this.generateTOTPUserCase.execute(input.mrn);
  }

  @Mutation(() => String)
  async verifyOTP(@Args('validateOTPInput') input: VerifyOTPDto) {
    return await this.verifyTOTPUserCase.execute(input);
  }
}
