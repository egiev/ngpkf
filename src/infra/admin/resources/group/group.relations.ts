import { RelationOptions, RelationsFeatureOptions } from '@adminjs/relations';
import { AdminContext } from '@/infra/admin/common/interfaces';

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
        resourceId: 'PermissionEntity',
      },
      deleteOptions: {
        enableDeleteRelation: false,
        enableDeleteRelatedRecord: true,
      },
    },
  };
}
