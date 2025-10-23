import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/admin/common/types';
import { PermissionEntity } from '@/iam/permission/infrastructure/persistence/entities';

export function buildPermissionResource(context: AdminContext): ResourceWithOptions {
  return {
    resource: { model: PermissionEntity, orm: context.orm },
    options: {
      navigation: { name: null, icon: 'Shield' },
    },
    features: [context.relations.targetRelationSettingsFeature()],
  };
}
