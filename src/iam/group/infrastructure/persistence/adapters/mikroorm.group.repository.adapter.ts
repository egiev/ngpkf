import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ENUM_DATABASE } from '@/common/database/constants';
import { GroupRepositoryPort } from '@/iam/group/domain/ports';
import { GroupEntity } from '@/iam/group/infrastructure/persistence/entities';

@Injectable()
export class MikoormGroupRepositoryAdapter implements GroupRepositoryPort {
  constructor(
    @InjectRepository(GroupEntity, ENUM_DATABASE.Postgres)
    private readonly groupRepository: EntityRepository<GroupEntity>,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const count = await this.groupRepository.count({ name });
    return count > 0;
  }

  async existsByNames(names: string[]): Promise<boolean[]> {
    if (names.length === 0) {
      return [];
    }

    const foundGroups = await this.groupRepository.find({ name: { $in: names } });

    const foundNamesSet = new Set(foundGroups.map((group) => group.name));

    return names.map((name) => foundNamesSet.has(name));
  }
}
