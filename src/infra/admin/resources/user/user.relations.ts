import { RelationOptions, RelationsFeatureOptions } from '@adminjs/relations';
import { AdminContext } from '@/infra/admin/common/interfaces';

export function buildUserRelations(context: AdminContext): RelationsFeatureOptions<RelationOptions> {
  return {
    groups: {
      type: context.relations.RelationType.ManyToMany,
      junction: {
        joinKey: 'user',
        inverseJoinKey: 'group',
        throughResourceId: 'UserGroupEntity',
      },
      target: {
        resourceId: 'GroupEntity',
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
        throughResourceId: 'UserPermissionEntity',
      },
      target: {
        resourceId: 'PermissionEntity',
      },
      deleteOptions: {
        enableDeleteRelation: false,
        enableDeleteRelatedRecord: true,
      },
    },
  };
}
