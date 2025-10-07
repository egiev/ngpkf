import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ENUM_KAFKA_TOPICS } from '@/infra/kafka/constants';
import { UserEntity } from '@/modules/user/core/entities';

@Controller()
export class UserKafkaController {
  private readonly logger = new Logger(UserKafkaController.name);

  @EventPattern(ENUM_KAFKA_TOPICS.UserCreated)
  onUserCreated(@Payload() user: UserEntity) {
    this.logger.log(user);
  }
}
