import { RelationOptions, RelationsFeatureOptions } from '@adminjs/relations';
import { AdminContext } from '@/admin/common/types';

export function buildUserRelations(context: AdminContext): RelationsFeatureOptions<RelationOptions> {
  return {
    groups: {
      type: context.relations.RelationType.ManyToMany,
      junction: {
        joinKey: 'user',
        inverseJoinKey: 'group',
        throughResourceId: 'AuthUserGroupEntity',
      },
      target: {
        resourceId: 'AuthGroupEntity',
      },
      deleteOptions: {
        enableDeleteRelation: false,
        enableDeleteRelatedRecord: true,
      },
    },
    permissions: {
      type: context.relations.RelationType.ManyToMany,
      junction: {
        joinKey: 'user',
        inverseJoinKey: 'permission',
        throughResourceId: 'AuthUserPermissionEntity',
      },
      target: {
        resourceId: 'AuthPermissionEntity',
      },
      deleteOptions: {
        enableDeleteRelation: false,
        enableDeleteRelatedRecord: true,
      },
    },
  };
}
