import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuthUser } from '@/auth-user/domain/entities';
import { AuthUserRepositoryPort } from '@/auth-user/domain/ports';
import {
  AuthPermissionEntity,
  AuthUserEntity,
  AuthUserPermissionEntity,
} from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_DATABASE } from '@/common/database/constants';

@Injectable()
export class MikroormAuthUserRepositoryAdapter implements AuthUserRepositoryPort {
  constructor(
    @InjectRepository(AuthUserEntity, ENUM_DATABASE.Postgres)
    private readonly repository: EntityRepository<AuthUserEntity>,
  ) {}

  async save(user: AuthUser): Promise<void> {
    const { permissionNames, groupNames, groupPermissionNames, ...primitives } = user.toPrimitives();
    const em = this.repository.getEntityManager();
    const entity = await em.upsert(AuthUserEntity, primitives);

    // Sync permissions
    if (permissionNames) {
      entity.permissions.removeAll();

      const permissionEntities = await em.find(AuthPermissionEntity, { name: { $in: permissionNames } });

      for (const permission of permissionEntities) {
        const userPermission = em.create(AuthUserPermissionEntity, { user: entity, permission });
        entity.permissions.add(userPermission);
      }
    }

    await em.flush();
  }

  async getAll(): Promise<AuthUser[]> {
    const entities = await this.repository.findAll({
      populate: ['permissions.permission', 'groups.group.permissions.permission'],
    });
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async getOneById(id: string): Promise<AuthUser | null> {
    const entity = await this.repository.findOne(
      { id },
      { populate: ['permissions.permission', 'groups.group.permissions.permission'] },
    );
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async getOneByUsername(username: string): Promise<AuthUser | null> {
    const entity = await this.repository.findOne(
      { username },
      { populate: ['permissions.permission', 'groups.group.permissions.permission'] },
    );
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.nativeDelete({ id });
  }

  async existByUsername(username: string): Promise<boolean> {
    const count = await this.repository.count({ username });
    return count > 0;
  }

  private mapToDomain(entity: AuthUserEntity): AuthUser {
    const permissionNames = entity.permissions.getItems().map((up) => up.permission.name);
    const groupNames = entity.groups.getItems().map((ug) => ug.group.name);
    const groupPermissionNames = entity.groups
      .getItems()
      .flatMap((ug) => ug.group.permissions.getItems().map((up) => up.permission.name));

    return AuthUser.fromPrimitives({
      id: entity.id,
      username: entity.username,
      passwordHash: entity.passwordHash,
      permissionNames,
      groupNames,
      groupPermissionNames,
      isSuperUser: entity.isSuperUser,
      isStaff: entity.isStaff,
    });
  }
}
