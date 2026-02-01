import { RelationOptions, RelationsFeatureOptions } from '@adminjs/relations';
import { AdminContext } from '@/admin/common/types';

export function createGroupRelations(context: AdminContext): RelationsFeatureOptions<RelationOptions> {
  return {
    permissions: {
      type: context.relations.RelationType.ManyToMany,
      junction: {
        joinKey: 'group',
        inverseJoinKey: 'permission',
        throughResourceId: 'GroupPermissionEntity',
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
