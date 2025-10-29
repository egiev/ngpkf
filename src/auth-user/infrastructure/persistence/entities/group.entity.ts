import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AuthGroupPermissionEntity } from './group-permission.entity';
import { AuthUserGroupEntity } from './user-group.entity';

@Entity({ tableName: 'auth_groups' })
export class AuthGroupEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => AuthUserGroupEntity, (gp) => gp.group, { eager: true })
  users = new Collection<AuthUserGroupEntity>(this);

  @OneToMany(() => AuthGroupPermissionEntity, (gp) => gp.group, { eager: true })
  permissions = new Collection<AuthGroupPermissionEntity>(this);

  @Property({ defaultRaw: 'now()', nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
