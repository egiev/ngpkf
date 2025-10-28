import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AuthGroupEntity } from './group.entity';
import { AuthPermissionEntity } from './permission.entity';

@Entity({ tableName: 'auth_group_permissions' })
export class AuthGroupPermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => AuthGroupEntity, {
    cascade: [Cascade.REMOVE],
  })
  group: AuthGroupEntity;

  @ManyToOne(() => AuthPermissionEntity, {
    cascade: [Cascade.REMOVE],
  })
  permission: AuthPermissionEntity;
}
