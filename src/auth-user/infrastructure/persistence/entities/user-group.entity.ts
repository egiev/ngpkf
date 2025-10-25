import { BaseEntity, Cascade, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { GroupEntity } from '@/auth-user/infrastructure/persistence/entities/group.entity';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'auth_user_groups' })
export class UserGroupEntity extends BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => UserEntity, {
    cascade: [Cascade.REMOVE],
  })
  user: UserEntity;

  @ManyToOne(() => GroupEntity, {
    cascade: [Cascade.REMOVE],
  })
  group: GroupEntity;
}
