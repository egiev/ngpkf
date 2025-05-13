import { Provider } from '@nestjs/common';
import { LocalStorage, MessageBroker, SendEmail, Totp } from '@core/abstracts';
import { PatientRepository, UserRepository } from '@core/repositories';
import {
  CreateUserCase,
  FindUserCase,
  GenerateTOTPUserCase,
  SendResultsUserCase,
  SendTOTPUserCase,
  VerifyTOTPUserCase,
} from '@application/use-cases';
import { createUseCaseProvider } from '@shared/utils';
import { UserService } from '../implementations';

export const userProvider: Provider[] = [
  { provide: UserRepository, useClass: UserService },
  createUseCaseProvider(FindUserCase, [UserRepository]),
  createUseCaseProvider(CreateUserCase, [UserRepository, MessageBroker]),
  createUseCaseProvider(GenerateTOTPUserCase, [
    PatientRepository,
    UserRepository,
    Totp,
    MessageBroker,
  ]),
  createUseCaseProvider(VerifyTOTPUserCase, [
    PatientRepository,
    UserRepository,
    Totp,
    MessageBroker,
  ]),
  createUseCaseProvider(SendTOTPUserCase, [SendEmail]),
  createUseCaseProvider(SendResultsUserCase, [SendEmail, LocalStorage]),
];
