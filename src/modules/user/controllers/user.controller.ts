import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ENUM_KAFKA_TOPICS } from '@/infra/kafka/constants';
import { UserEntity } from '@/modules/user/entities';
import { UserService } from '@/modules/user/services';

@Controller({ path: 'user' })
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async users() {
    return await this.userService.getUsers();
  }

  @EventPattern(ENUM_KAFKA_TOPICS.UserCreated)
  onUserCreated(@Payload() user: UserEntity) {
    this.logger.log(user);
  }
}
