import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/infra/admin/common/interfaces';
import { PermissionEntity } from '@/modules/user/core/entities';

export function buildPermissionResource(context: AdminContext): ResourceWithOptions {
  return {
    resource: { model: PermissionEntity, orm: context.orm },
    options: {
      navigation: { name: null, icon: 'Shield' },
    },
    features: [context.relations.targetRelationSettingsFeature()],
  };
}
