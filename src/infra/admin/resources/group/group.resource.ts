import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/infra/admin/common/interfaces';
import { GroupEntity } from '@/modules/user/core/entities';
import { createGroupRelations } from './group.relations';

export function buildGroupResource(context: AdminContext): ResourceWithOptions {
  const groupRelations = createGroupRelations(context);

  return {
    resource: { model: GroupEntity, orm: context.orm },
    options: {
      navigation: { name: null, icon: 'Users' },
    },
    features: [
      context.relations.owningRelationSettingsFeature({
        componentLoader: context.componentLoader,
        licenseKey: context.licenseKey,
        relations: groupRelations,
      }),
      context.relations.targetRelationSettingsFeature(),
    ],
  };
}
