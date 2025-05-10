import { Provider } from '@nestjs/common';
import { MessageBroker, SendEmail, Totp } from '@core/abstracts';
import { PatientRepository, UserRepository } from '@core/repositories';
import { UserAdapter } from '@application/adapters';
import {
  CreateUserCase,
  FindUserCase,
  GenerateTOTPUserCase,
  SendTOTPUserUseCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';
import { UserService } from '../implementations';

const useCases: Provider[] = [
  {
    provide: FindUserCase,
    useFactory: (userRepository: UserRepository) =>
      new FindUserCase(userRepository),
    inject: [UserRepository],
  },
  {
    provide: CreateUserCase,
    useFactory: (userRepository: UserRepository) =>
      new CreateUserCase(userRepository),
    inject: [UserRepository],
  },
  {
    provide: GenerateTOTPUserCase,
    useFactory: (
      patientRepository: PatientRepository,
      userRepository: UserRepository,
      totp: Totp,
      messageBroker: MessageBroker,
    ) =>
      new GenerateTOTPUserCase(
        patientRepository,
        userRepository,
        totp,
        messageBroker,
      ),
    inject: [PatientRepository, UserRepository, Totp, MessageBroker],
  },
  {
    provide: VerifyTOTPUserCase,
    useFactory: (
      patientRepository: PatientRepository,
      userRepository: UserRepository,
      totp: Totp,
      messageBroker: MessageBroker,
    ) =>
      new VerifyTOTPUserCase(
        patientRepository,
        userRepository,
        totp,
        messageBroker,
      ),
    inject: [PatientRepository, UserRepository, Totp, MessageBroker],
  },
  {
    provide: SendTOTPUserUseCase,
    useFactory: (sendEmail: SendEmail) => new SendTOTPUserUseCase(sendEmail),
    inject: [SendEmail],
  },
];

export const userProvider: Provider[] = [
  { provide: UserRepository, useClass: UserService },
  ...useCases,
  {
    provide: UserAdapter,
    useFactory: (
      findUserCase: FindUserCase,
      createUserCase: CreateUserCase,
      generateTOTPUserCase: GenerateTOTPUserCase,
      verifyTOTPUserCase: VerifyTOTPUserCase,
      sendTOTPUserUseCase: SendTOTPUserUseCase,
    ) =>
      new UserAdapter(
        findUserCase,
        createUserCase,
        generateTOTPUserCase,
        verifyTOTPUserCase,
        sendTOTPUserUseCase,
      ),
    inject: [
      FindUserCase,
      CreateUserCase,
      GenerateTOTPUserCase,
      VerifyTOTPUserCase,
      SendTOTPUserUseCase,
    ],
  },
];
