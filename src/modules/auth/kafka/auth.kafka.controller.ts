import { Controller, Logger } from '@nestjs/common';

@Controller()
export class AuthKafkaController {
  private readonly logger = new Logger(AuthKafkaController.name);

  // Put your event patterns and handlers here
}
