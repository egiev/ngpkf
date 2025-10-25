import { EntityManager } from '@mikro-orm/core';
import { getEntityManagerToken } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminContext } from '@/admin/common/types';
import { LoginWithCredentialsUseCase } from '@/auth/application';
import { ENUM_DATABASE } from '@/common/database/constants';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';
import { init } from '@/configs/postgres.config';

export async function buildAdminContext(app: INestApplication): Promise<AdminContext> {
  const adminJSModule = await import('adminjs');
  const componentLoader = new adminJSModule.ComponentLoader();

  const adminJSRelationsModule = await import('@adminjs/relations');
  const { RelationType, owningRelationSettingsFeature, targetRelationSettingsFeature } = adminJSRelationsModule;

  const orm = await init();
  const em = app.get<EntityManager>(getEntityManagerToken(ENUM_DATABASE.Postgres));

  const configService = app.get(ConfigService);
  const loginWithCredentialsUseCase = app.get(LoginWithCredentialsUseCase);
  const hashingService = app.get(HashingPort);
  const idGeneratorService = app.get(IdGeneratorPort);

  const licenseKey = configService.get<string>('ADMIN_LICENSE_KEY') || '';

  return {
    componentLoader,
    orm,
    em,
    licenseKey,
    services: {
      configService,
      loginWithCredentialsUseCase,
      hashingService,
      idGeneratorService,
    },
    relations: {
      owningRelationSettingsFeature,
      targetRelationSettingsFeature,
      RelationType,
    },
  };
}
