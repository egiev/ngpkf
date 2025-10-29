import { ResourceWithOptions } from 'adminjs';
import { AdminContext, AdminUser } from '@/admin/common/types';
import { ServiceAccountEntity } from '@/api-key/infrastructure/persistence/entities';

export function buildApiKeyResource(context: AdminContext): ResourceWithOptions {
  const {
    services: { hashingService, idGeneratorService },
  } = context;

  return {
    resource: { model: ServiceAccountEntity, orm: context.orm },
    options: {
      navigation: { icon: 'Key' },
      actions: {
        list: {
          isAccessible: ({ currentAdmin }) => {
            const adminUser = currentAdmin as AdminUser;
            return adminUser.isSuperUser;
          },
        },
        new: {
          layout: ['clientId'],
          before: async (request) => {
            if (request.payload) {
              const id = idGeneratorService.generate();
              const hashedKey = await hashingService.hash(id);

              request.payload.apiKeyHash = hashedKey;
            }

            return request;
          },
        },
      },
    },
    features: [context.relations.targetRelationSettingsFeature()],
  };
}
