import { EntityManager } from '@mikro-orm/core';
import { getEntityManagerToken } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM_DATABASE } from '@/common/database/constants';
import { HelperHashService } from '@/common/helpers/services';
import { init } from '@/config/postgres.config';
import { AdminContext } from '@/infra/admin/common/interfaces';
import { AuthService } from '@/modules/auth/core/services';

export async function buildAdminContext(app: INestApplication): Promise<AdminContext> {
  const adminJSModule = await import('adminjs');
  const componentLoader = new adminJSModule.ComponentLoader();

  const adminJSRelationsModule = await import('@adminjs/relations');
  const { RelationType, owningRelationSettingsFeature, targetRelationSettingsFeature } = adminJSRelationsModule;

  const orm = await init();
  const em = app.get<EntityManager>(getEntityManagerToken(ENUM_DATABASE.Postgres));

  const configService = app.get(ConfigService);
  const authService = app.get(AuthService);
  const helperHashService = app.get(HelperHashService);

  const licenseKey = configService.get<string>('ADMIN_LICENSE_KEY') || '';

  return {
    componentLoader,
    orm,
    em,
    licenseKey,
    services: {
      configService,
      authService,
      helperHashService,
    },
    relations: {
      owningRelationSettingsFeature,
      targetRelationSettingsFeature,
      RelationType,
    },
  };
}
