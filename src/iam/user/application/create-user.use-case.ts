import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from '@/common/ddd/use-case';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';
import { CreateUserRequest } from '@/iam/user/application/requests';
import { User } from '@/iam/user/domain/entities';
import { UsernameAlreadyExistError } from '@/iam/user/domain/errors';
import { UserRepositoryPort } from '@/iam/user/domain/ports';

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
