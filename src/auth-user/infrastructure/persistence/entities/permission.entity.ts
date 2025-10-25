import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { GroupPermissionEntity } from '@/auth-user/infrastructure/persistence/entities/group-permission.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Entity({ tableName: 'auth_permissions' })
export class PermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => UserPermissionEntity, (up) => up.permission, { eager: true })
  users? = new Collection<UserPermissionEntity>(this);

  @OneToMany(() => GroupPermissionEntity, (gp) => gp.permission, {})
  groups? = new Collection<GroupPermissionEntity>(this);

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
