import { UserEntity } from '@core/entities';
import {
  CreateUserCase,
  FindUserCase,
  GenerateTOTPUserCase,
  SendTOTPUserUseCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';

export class UserAdapter {
  constructor(
    private readonly findUserCase: FindUserCase,
    private readonly createUserCase: CreateUserCase,
    private readonly generateTOTPUserCase: GenerateTOTPUserCase,
    private readonly verifyTOTPUserCase: VerifyTOTPUserCase,
    private readonly sendTOTPUserCase: SendTOTPUserUseCase,
  ) {}

  findOne(params: string) {
    return this.findUserCase.execute(params);
  }

  create(params: UserEntity) {
    return this.createUserCase.execute(params);
  }

  generateTOTP(params: string) {
    return this.generateTOTPUserCase.execute(params);
  }

  verifyTOTP(params: { mrn: string; otp: string }) {
    return this.verifyTOTPUserCase.execute(params);
  }

  sendTOTP(params: any) {
    return this.sendTOTPUserCase.execute(params);
  }
}
