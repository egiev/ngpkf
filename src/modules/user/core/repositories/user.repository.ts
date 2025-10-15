import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ENUM_DATABASE } from '@/common/database/constants';
import { MikroOrmRepository } from '@/infra/database/mikroorm';
import { UserEntity } from '@/modules/user/core/entities';

@Injectable()
export class UserRepository extends MikroOrmRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity, ENUM_DATABASE.Postgres)
    protected readonly repository: EntityRepository<UserEntity>,
  ) {
    super(
      repository,
      {
        populate: ['permissions.permission', 'groups.group', 'groups.group.permissions.permission'] as never[],
      },
      {
        populate: ['permissions.permission', 'groups.group', 'groups.group.permissions.permission'] as never[],
      },
    );
  }
}
