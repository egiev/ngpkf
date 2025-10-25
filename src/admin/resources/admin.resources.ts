import { ResourceWithOptions } from 'adminjs';
import { buildApiKeyResource } from '@/admin/resources/api-key';
import { buildGroupResource } from '@/admin/resources/group';
import { buildPermissionResource } from '@/admin/resources/permission';
import { buildUserResource } from '@/admin/resources/user';
import {
  GroupPermissionEntity,
  UserGroupEntity,
  UserPermissionEntity,
} from '@/auth-user/infrastructure/persistence/entities';
import { AdminContext } from '../common/types';

export function createResources(context: AdminContext): ResourceWithOptions[] {
  return [
    buildUserResource(context),
    buildGroupResource(context),
    buildPermissionResource(context),
    buildApiKeyResource(context),
    ...[UserGroupEntity, UserPermissionEntity, GroupPermissionEntity].map((model) => ({
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
