import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { UserGroupEntity } from './user-group.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Exclude()
@Entity({ tableName: 'auth_users' })
export class UserEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  username!: string;

  @Property({ fieldName: 'password' })
  passwordHash!: string;

  @OneToMany(() => UserGroupEntity, (up) => up.user, { eager: true })
  groups = new Collection<UserGroupEntity>(this);

  @OneToMany(() => UserPermissionEntity, (up) => up.user, { eager: true })
  permissions = new Collection<UserPermissionEntity>(this);

  @Property({ default: false })
  isSuperUser: boolean;

  @Property({ default: false })
  isStaff: boolean;

  @Property({ default: true })
  isActive: boolean;

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
