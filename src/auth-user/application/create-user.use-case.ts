import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from '@/auth-user/application/requests';
import { User } from '@/auth-user/domain/entities';
import { UsernameAlreadyExistError } from '@/auth-user/domain/errors';
import { UserRepositoryPort } from '@/auth-user/domain/ports';
import { UseCase } from '@/common/ddd/use-case';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, User> {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly idGenerator: IdGeneratorPort,
    private readonly hashing: HashingPort,
  ) {}

  async execute(params: CreateUserRequest): Promise<User> {
    const usernameExist = await this.userRepository.existByUsername(params.username);

    if (usernameExist) {
      // TODO: Create exception
      throw new UsernameAlreadyExistError(params.username);
    }

    this.logger.log('Start creating user', params);

    const id = this.idGenerator.generate();

    const hashedPassword = await this.hashing.hash(params.password);

    const user = User.create({
      id,
      username: params.username,
      hashedPassword,
      isSuperUser: params.isSuperUser,
    });

    await this.userRepository.save(user);
    this.logger.log('User successfully created', user);
    return user;
  }
}
