import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserGroupEntity } from '@/iam/user/infrastructure/persistence/entities';
import { GroupPermissionEntity } from './group-permission.entity';

@Entity({ tableName: 'groups' })
export class GroupEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => UserGroupEntity, (gp) => gp.group, { eager: true })
  users = new Collection<UserGroupEntity>(this);

  @OneToMany(() => GroupPermissionEntity, (gp) => gp.group, { eager: true })
  permissions = new Collection<GroupPermissionEntity>(this);

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
