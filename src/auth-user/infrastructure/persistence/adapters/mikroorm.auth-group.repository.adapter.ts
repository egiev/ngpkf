import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuthGroupRepositoryPort } from '@/auth-user/domain/ports';
import { AuthGroupEntity } from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_DATABASE } from '@/common/database/constants';

@Injectable()
export class MikoormAuthGroupRepositoryAdapter implements AuthGroupRepositoryPort {
  constructor(
    @InjectRepository(AuthGroupEntity, ENUM_DATABASE.Postgres)
    private readonly repository: EntityRepository<AuthGroupEntity>,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repository.count({ name });
    return count > 0;
  }

  async existsByNames(names: string[]): Promise<boolean[]> {
    if (names.length === 0) {
      return [];
    }

    const foundGroups = await this.repository.find({ name: { $in: names } });

    const foundNamesSet = new Set(foundGroups.map((group) => group.name));

    return names.map((name) => foundNamesSet.has(name));
  }
}
