import { ResourceWithOptions } from 'adminjs';
import { buildGroupResource } from '@/infra/admin/resources/group';
import { buildPermissionResource } from '@/infra/admin/resources/permission';
import { buildUserResource } from '@/infra/admin/resources/user';
import { GroupPermissionEntity, UserGroupEntity, UserPermissionEntity } from '@/modules/user/core/entities';
import { AdminContext } from '../common/interfaces';

export function createResources(context: AdminContext): ResourceWithOptions[] {
  return [
    buildUserResource(context),
    buildGroupResource(context),
    buildPermissionResource(context),
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
