import { ResourceWithOptions } from 'adminjs';
import { AdminContext, AdminUser } from '@/admin/common/types';
import { AuthPermissionEntity } from '@/auth-user/infrastructure/persistence/entities';

export function buildAuthPermissionResource(context: AdminContext): ResourceWithOptions {
  return {
    resource: { model: AuthPermissionEntity, orm: context.orm },
    options: {
      navigation: { name: 'User Management', icon: 'Shield' },
      actions: {
        list: {
          isAccessible: ({ currentAdmin }) => {
            const adminUser = currentAdmin as AdminUser;
            return adminUser.isSuperUser;
          },
        },
      },
    },
    features: [context.relations.targetRelationSettingsFeature()],
  };
}
