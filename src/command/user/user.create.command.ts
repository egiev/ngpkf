import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager, RequestContext } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { ENUM_DATABASE } from '@/common/database/constants';
import { UserService } from '@/modules/user/core/services';

export type CreateUserOptions = {
  username: string;
  password: string;
  superUser: boolean;
};

@Injectable()
@Command({
  name: 'user:create',
  description: 'Create a new user',
})
export class UserCreateCommand extends CommandRunner {
  private readonly logger = new Logger(UserCreateCommand.name);

  constructor(
    @InjectEntityManager(ENUM_DATABASE.Postgres) private readonly em: EntityManager,
    private readonly userService: UserService,
  ) {
    super();
  }

  async run(_passedParams: string[], options: CreateUserOptions): Promise<void> {
    if (!options.username || !options.password) {
      this.logger.error('Username and password are required');
      return;
    }

    await RequestContext.create(this.em, async () => {
      this.logger.log(`Starting ${UserCreateCommand.name} command`);
      await this.userService.createUser({
        ...options,
        isSuperUser: options.superUser,
      });
      this.logger.log(`${UserCreateCommand.name} command finished`);
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
