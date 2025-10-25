import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { GroupEntity } from './group.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ tableName: 'auth_group_permissions' })
export class GroupPermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => GroupEntity, {
    cascade: [Cascade.REMOVE],
  })
  group: GroupEntity;

  @ManyToOne(() => PermissionEntity, {
    cascade: [Cascade.REMOVE],
  })
  permission: PermissionEntity;
}
