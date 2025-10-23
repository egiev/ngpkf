import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ENUM_DATABASE } from '@/common/database/constants';
import { PermissionRepositoryPort } from '@/iam/permission/domain/ports';
import { PermissionEntity } from '@/iam/permission/infrastructure/persistence/entities';

@Injectable()
export class MikoormPermissionRepositoryAdapter implements PermissionRepositoryPort {
  constructor(
    @InjectRepository(PermissionEntity, ENUM_DATABASE.Postgres)
    private readonly permissionRepository: EntityRepository<PermissionEntity>,
  ) {}

  async existsByName(name: string): Promise<boolean> {
    const count = await this.permissionRepository.count({ name });
    return count > 0;
  }

  async existsByNames(names: string[]): Promise<boolean[]> {
    if (names.length === 0) {
      return [];
    }

    const foundPermissions = await this.permissionRepository.find({ name: { $in: names } });

    const foundNamesSet = new Set(foundPermissions.map((permission) => permission.name));

    return names.map((name) => foundNamesSet.has(name));
  }
}
