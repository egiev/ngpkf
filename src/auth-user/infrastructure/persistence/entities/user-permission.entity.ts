import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PermissionEntity } from '@/auth-user/infrastructure/persistence/entities/permission.entity';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'auth_user_permissions' })
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
