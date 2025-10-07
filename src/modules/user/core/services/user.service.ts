import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ENUM_KAFKA_TOPICS, KAFKA_SERVICE_NAME } from '@/infra/kafka/constants';
import { UserEntity } from '@/modules/user/core/entities';
import { UserRepository } from '@/modules/user/core/repositories';
import { HelperHashService } from '../../../../common/helpers/services/helper.hash.service';

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

  async createUser(params: UserEntity) {
    const password = await this.helperHashService.hash(params.password);
    const user = { ...params, password };
    return this.userRepository.create(user);
  }
}
