import { ResourceWithOptions } from 'adminjs';
import { AuthUserEntity } from '@/auth-user/infrastructure/persistence/entities';
import { AdminContext } from '../../common/types';
import { actions } from './auth-user.actions';
import { properties } from './auth-user.properties';
import { buildUserRelations } from './auth-user.relations';

export function buildAuthUserResource(context: AdminContext): ResourceWithOptions {
  const userRelations = buildUserRelations(context);

  return {
    resource: { model: AuthUserEntity, orm: context.orm },
    options: {
      titleProperty: 'username',
      navigation: { name: 'User Management', icon: 'User' },
      properties,
      actions: actions(context),
    },
    features: [
      context.relations.owningRelationSettingsFeature({
        componentLoader: context.componentLoader,
        licenseKey: context.licenseKey,
        relations: userRelations,
      }),
      context.relations.targetRelationSettingsFeature(),
    ],
  };
}
