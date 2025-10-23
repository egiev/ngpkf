import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PermissionEntity } from '@/iam/permission/infrastructure/persistence/entities';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'user_permissions' })
export class UserPermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => UserEntity, {
    cascade: [Cascade.REMOVE],
  })
  user: UserEntity;

  @ManyToOne(() => PermissionEntity, {
    cascade: [Cascade.REMOVE],
  })
  permission: PermissionEntity;
}
