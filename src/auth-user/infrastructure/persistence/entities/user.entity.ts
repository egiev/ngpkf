import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { AuthUserGroupEntity } from './user-group.entity';
import { AuthUserPermissionEntity } from './user-permission.entity';

@Exclude()
@Entity({ tableName: 'auth_users' })
export class AuthUserEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  username!: string;

  @Property({ fieldName: 'password' })
  passwordHash!: string;

  @OneToMany(() => AuthUserGroupEntity, (up) => up.user, { eager: true })
  groups = new Collection<AuthUserGroupEntity>(this);

  @OneToMany(() => AuthUserPermissionEntity, (up) => up.user, { eager: true })
  permissions = new Collection<AuthUserPermissionEntity>(this);

  @Property({ default: false })
  isSuperUser: boolean;

  @Property({ default: false })
  isStaff: boolean;

  @Property({ default: true })
  isActive: boolean;

  @Property({ defaultRaw: 'now()', nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
