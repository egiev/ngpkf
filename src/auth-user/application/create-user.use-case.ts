import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from '@/auth-user/application/requests';
import { AuthUser } from '@/auth-user/domain/entities';
import { UsernameAlreadyExistError } from '@/auth-user/domain/errors';
import { AuthUserRepositoryPort } from '@/auth-user/domain/ports';
import { UseCase } from '@/common/ddd/use-case';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, AuthUser> {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    private readonly authUserRepository: AuthUserRepositoryPort,
    private readonly idGenerator: IdGeneratorPort,
    private readonly hashing: HashingPort,
  ) {}

  async execute(params: CreateUserRequest): Promise<AuthUser> {
    const usernameExist = await this.authUserRepository.existByUsername(params.username);

    if (usernameExist) {
      // TODO: Create exception
      throw new UsernameAlreadyExistError(params.username);
    }

    this.logger.log('Start creating user', params);

    const id = this.idGenerator.generate();

    const hashedPassword = await this.hashing.hash(params.password);

    const user = AuthUser.create({
      id,
      username: params.username,
      hashedPassword,
      isSuperUser: params.isSuperUser,
    });

    await this.authUserRepository.save(user);
    this.logger.log('User successfully created', user);
    return user;
  }
}
