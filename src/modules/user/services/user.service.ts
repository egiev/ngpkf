import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '@/modules/user/repositories';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
