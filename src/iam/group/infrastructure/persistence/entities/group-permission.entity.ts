import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PermissionEntity } from '../../../../permission/infrastructure/persistence/entities/permission.entity';
import { GroupEntity } from './group.entity';

@Entity({ tableName: 'group_permissions' })
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
