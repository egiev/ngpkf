import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/admin/common/types';
import { GroupEntity } from '@/auth-user/infrastructure/persistence/entities';
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
