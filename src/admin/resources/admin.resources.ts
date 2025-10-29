import { ResourceWithOptions } from 'adminjs';
import { buildApiKeyResource } from '@/admin/resources/api-key';
import { buildAuthGroupResource } from '@/admin/resources/auth-group';
import { buildAuthPermissionResource } from '@/admin/resources/auth-permission';
import { buildAuthUserResource } from '@/admin/resources/auth-user';
import {
  AuthGroupPermissionEntity,
  AuthUserGroupEntity,
  AuthUserPermissionEntity,
} from '@/auth-user/infrastructure/persistence/entities';
import { AdminContext } from '../common/types';

export function createResources(context: AdminContext): ResourceWithOptions[] {
  return [
    buildAuthUserResource(context),
    buildAuthGroupResource(context),
    buildAuthPermissionResource(context),
    buildApiKeyResource(context),
    ...[AuthUserGroupEntity, AuthUserPermissionEntity, AuthGroupPermissionEntity].map((model) => ({
      resource: {
        model,
        orm: context.orm,
      },
      options: {
        navigation: false,
      },
      features: [context.relations.targetRelationSettingsFeature()],
    })),
  ];
}
