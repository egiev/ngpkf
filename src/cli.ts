import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { CommandModule } from '@/command/command.module';

async function bootstrap() {
  const logger = new Logger();

  logger.log('CLI bootstrap starting');
  await CommandFactory.run(CommandModule, ['log', 'warn', 'error']);
  logger.log('CLI bootstrap finished');

  process.exit(0);
}

bootstrap();
