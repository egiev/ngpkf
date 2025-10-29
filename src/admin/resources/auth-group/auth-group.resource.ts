import { ResourceWithOptions } from 'adminjs';
import { AdminContext, AdminUser } from '@/admin/common/types';
import { AuthGroupEntity } from '@/auth-user/infrastructure/persistence/entities';
import { createGroupRelations } from './auth-group.relations';

export function buildAuthGroupResource(context: AdminContext): ResourceWithOptions {
  const groupRelations = createGroupRelations(context);

  return {
    resource: { model: AuthGroupEntity, orm: context.orm },
    options: {
      navigation: { name: 'User Management', icon: 'Users' },
      actions: {
        list: {
          isAccessible: ({ currentAdmin }) => {
            const adminUser = currentAdmin as AdminUser;
            return adminUser.isSuperUser;
          },
        },
      },
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
