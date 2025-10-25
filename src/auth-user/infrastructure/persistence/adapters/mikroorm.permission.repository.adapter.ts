import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PermissionRepositoryPort } from '@/auth-user/domain/ports/permission.repository.port';
import { PermissionEntity } from '@/auth-user/infrastructure/persistence/entities/permission.entity';
import { ENUM_DATABASE } from '@/common/database/constants';

@Injectable()
export class MikoormPermissionRepositoryAdapter implements PermissionRepositoryPort {
  constructor(
    @InjectRepository(PermissionEntity, ENUM_DATABASE.Postgres)
    private readonly repository: EntityRepository<PermissionEntity>,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const count = await this.repository.count({ name });
    return count > 0;
  }

  async existsByNames(names: string[]): Promise<boolean[]> {
    if (names.length === 0) {
      return [];
    }

    const foundPermissions = await this.repository.find({ name: { $in: names } });

    const foundNamesSet = new Set(foundPermissions.map((permission) => permission.name));

    return names.map((name) => foundNamesSet.has(name));
  }
}
