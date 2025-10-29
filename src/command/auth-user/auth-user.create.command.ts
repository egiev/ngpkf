import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager, RequestContext } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { CreateUserUseCase } from '@/auth-user/application';
import { ENUM_DATABASE } from '@/common/database/constants';

export type CreateAuthUserOptions = {
  username: string;
  password: string;
  superUser: boolean;
};

@Injectable()
@Command({
  name: 'auth-user:create',
  description: 'Create a new user',
})
export class AuthUserCreateCommand extends CommandRunner {
  private readonly logger = new Logger(AuthUserCreateCommand.name);

  constructor(
    @InjectEntityManager(ENUM_DATABASE.Postgres) private readonly em: EntityManager,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {
    super();
  }

  async run(_passedParams: string[], options: CreateAuthUserOptions): Promise<void> {
    this.logger.log(`Received options: ${JSON.stringify(options)}`);
    if (!options.username || !options.password) {
      this.logger.error('Username and password are required');
      return;
    }

    await RequestContext.create(this.em, async () => {
      this.logger.log(`Starting ${AuthUserCreateCommand.name} command`);
      await this.createUserUseCase.execute({
        ...options,
        isSuperUser: options.superUser,
      });
      this.logger.log(`${AuthUserCreateCommand.name} command finished`);
    });
  }

  @Option({
    flags: '-u, --username <username>',
    description: 'Username for the new user',
  })
  parseUsername(val: string): string {
    return val;
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'Password for the new user',
  })
  parsePassword(val: string): string {
    return val;
  }

  @Option({
    flags: '--super-user',
    description: 'Create user as super user',
    defaultValue: false,
  })
  parseSuperUser(): boolean {
    return true;
  }
}
