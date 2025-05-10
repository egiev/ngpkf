import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserCase,
  FindUserCase,
  GenerateTOTPUserCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';
import { UserOrmEntity } from '@infrastructure/database/postgres';
import { CreateUserDto } from './dtos';
import { GenerateOTPDto } from './dtos/generate-totp.dto';
import { VerifyOTPDto } from './dtos/verify-otp.dto';

@Resolver(() => UserOrmEntity)
export class UserResolver {
  constructor(
    private readonly findUserCase: FindUserCase,
    private readonly createUserCase: CreateUserCase,
    private readonly generateTOTPUserCase: GenerateTOTPUserCase,
    private readonly verifyTOTPUserCase: VerifyTOTPUserCase,
  ) {}

  // @Query(() => [User], { name: 'users' })
  // async findAll() {
  //   return await this.userService.findAll();
  // }

  @Query(() => UserOrmEntity, { name: 'user' })
  async findOne(@Args('userId', { type: () => String }) userId: string) {
    return await this.findUserCase.execute(userId);
  }

  @Mutation(() => UserOrmEntity)
  async createUser(@Args('createUserInput') input: CreateUserDto) {
    return await this.createUserCase.execute(input);
  }

  @Mutation(() => String)
  async generateOTP(@Args('generateOTPInput') input: GenerateOTPDto) {
    return await this.generateTOTPUserCase.execute(input.mrn);
  }

  @Mutation(() => String)
  async verifyOTP(@Args('validateOTPInput') input: VerifyOTPDto) {
    return await this.verifyTOTPUserCase.execute(input);
  }

  // @Mutation(() => User)
  // async updateUser(
  //   @Args('userId', { type: () => String }) userId: string,
  //   @Args('createUserInput') input: UpdateUserDto,
  // ) {
  //   return await this.userService.update(userId, input);
  // }

  // @Mutation(() => Boolean)
  // async removeUser(@Args('userId', { type: () => String }) userId: string) {
  //   await this.userService.remove(userId);
  //   return true;
  // }
}
