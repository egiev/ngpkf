import { Controller, Get } from '@nestjs/common';
import { UserService } from '@/modules/user/core/services';

@Controller({ path: 'users' })
export class UserHttpController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async users() {
    return await this.userService.getUsers();
  }
}
