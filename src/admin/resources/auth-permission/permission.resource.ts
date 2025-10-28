import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/admin/common/types';
import { AuthPermissionEntity } from '@/auth-user/infrastructure/persistence/entities';

export function buildAuthPermissionResource(context: AdminContext): ResourceWithOptions {
  return {
    resource: { model: AuthPermissionEntity, orm: context.orm },
    options: {
      navigation: { name: null, icon: 'Shield' },
    },
    features: [context.relations.targetRelationSettingsFeature()],
  };
}
