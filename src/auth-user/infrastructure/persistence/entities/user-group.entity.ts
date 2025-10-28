import { BaseEntity, Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { AuthGroupEntity } from '@/auth-user/infrastructure/persistence/entities/group.entity';
import { AuthUserEntity } from './user.entity';

@Entity({ tableName: 'auth_user_groups' })
export class AuthUserGroupEntity extends BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => AuthUserEntity, {
    cascade: [Cascade.REMOVE],
  })
  user: AuthUserEntity;

  @ManyToOne(() => AuthGroupEntity, {
    cascade: [Cascade.REMOVE],
  })
  group: AuthGroupEntity;
}
