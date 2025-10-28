import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AuthGroupPermissionEntity } from '@/auth-user/infrastructure/persistence/entities/group-permission.entity';
import { AuthUserPermissionEntity } from './user-permission.entity';

@Entity({ tableName: 'auth_permissions' })
export class AuthPermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => AuthUserPermissionEntity, (up) => up.permission, { eager: true })
  users? = new Collection<AuthUserPermissionEntity>(this);

  @OneToMany(() => AuthGroupPermissionEntity, (gp) => gp.permission, {})
  groups? = new Collection<AuthGroupPermissionEntity>(this);

  @Property({ defaultRaw: 'now()', nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
