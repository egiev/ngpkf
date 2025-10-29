import { Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AuthPermissionEntity } from '@/auth-user/infrastructure/persistence/entities/permission.entity';
import { AuthUserEntity } from './user.entity';

@Entity({ tableName: 'auth_user_permissions' })
export class AuthUserPermissionEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => AuthUserEntity, {
    cascade: [Cascade.REMOVE],
  })
  user: AuthUserEntity;

  @ManyToOne(() => AuthPermissionEntity, {
    cascade: [Cascade.REMOVE],
  })
  permission: AuthPermissionEntity;
}
