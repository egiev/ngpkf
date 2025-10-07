import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from '@/modules/user/core/services';

@Controller({ path: 'users' })
export class UserHttpController {
  private readonly logger = new Logger(UserHttpController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async users() {
    return await this.userService.getUsers();
  }
}
