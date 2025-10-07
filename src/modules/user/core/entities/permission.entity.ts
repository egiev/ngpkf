import { BaseEntity, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { GroupPermissionEntity } from './group-permission.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Entity({ tableName: 'permissions' })
export class PermissionEntity extends BaseEntity {
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
