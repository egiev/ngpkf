import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@/auth-user/domain/entities';
import { UserRepositoryPort } from '@/auth-user/domain/ports';
import { PermissionEntity, UserEntity, UserPermissionEntity } from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_DATABASE } from '@/common/database/constants';

export class MikroormUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity, ENUM_DATABASE.Postgres)
    private readonly repository: EntityRepository<UserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const { permissionNames, groupNames, groupPermissionNames, ...primitives } = user.toPrimitives();
    const em = this.repository.getEntityManager();
    const entity = await em.upsert(UserEntity, primitives);

    // Sync permissions
    if (permissionNames) {
      entity.permissions.removeAll();

      const permissionEntities = await em.find(PermissionEntity, { name: { $in: permissionNames } });

      for (const permission of permissionEntities) {
        const userPermission = em.create(UserPermissionEntity, { user: entity, permission });
        entity.permissions.add(userPermission);
      }
    }

    await em.flush();
  }

  async getAll(): Promise<User[]> {
    const entities = await this.repository.findAll({
      populate: ['permissions.permission', 'groups.group.permissions.permission'],
    });
    return entities.map((entity) => this.mapToDomain(entity));
  }

  async getOneById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne(
      { id },
      { populate: ['permissions.permission', 'groups.group.permissions.permission'] },
    );
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  async getOneByUsername(username: string): Promise<User | null> {
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

  private mapToDomain(entity: UserEntity): User {
    const permissionNames = entity.permissions.getItems().map((up) => up.permission.name);
    const groupNames = entity.groups.getItems().map((ug) => ug.group.name);
    const groupPermissionNames = entity.groups
      .getItems()
      .flatMap((ug) => ug.group.permissions.getItems().map((up) => up.permission.name));

    return User.fromPrimitives({
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
