import { ResourceWithOptions } from 'adminjs';
import { AdminContext } from '@/admin/common/types';
import { ServiceAccountEntity } from '@/api-key/infrastructure/persistence/entities';

export function buildApiKeyResource(context: AdminContext): ResourceWithOptions {
  const {
    services: { hashingService, idGeneratorService },
  } = context;

  return {
    resource: { model: ServiceAccountEntity, orm: context.orm },
    options: {
      navigation: { name: null, icon: 'Shield' },
      actions: {
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
