import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { HelperHashService } from '@/common/helpers/services';
import { ENUM_KAFKA_TOPICS, KAFKA_SERVICE_NAME } from '@/infra/kafka/constants';
import { UserRepository } from '@/modules/user/core/repositories';
import { CreateUserType } from '@/modules/user/core/types';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly helperHashService: HelperHashService,
    @Inject(KAFKA_SERVICE_NAME) private readonly clientKafka: ClientKafka,
  ) {}

  async getUsers() {
    const users = await this.userRepository.findAll();
    this.clientKafka.emit(ENUM_KAFKA_TOPICS.UserCreated, users);
    return users;
  }

  async createUser(params: CreateUserType) {
    const password = await this.helperHashService.hash(params.password);
    const user = { ...params, password };
    return this.userRepository.create(user);
  }
}
