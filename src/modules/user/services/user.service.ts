import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ENUM_KAFKA_TOPICS, KAFKA_SERVICE_NAME } from '@/infra/kafka/constants';
import { UserRepository } from '@/modules/user/repositories';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(KAFKA_SERVICE_NAME) private readonly kafkaClient: ClientKafka,
  ) {}

  async createUser() {
    this.logger.log('hello');
    const users = await this.userRepository.findAll();
    const user = await this.userRepository.findOne({ id: 'lsd' });

    this.logger.log(users);
    this.logger.log(user);

    this.kafkaClient.emit(ENUM_KAFKA_TOPICS.UserCreated, user);
  }
}
