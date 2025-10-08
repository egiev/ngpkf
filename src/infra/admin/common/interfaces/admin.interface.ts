import { RelationsFeatureConfig, RelationType } from '@adminjs/relations';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { ComponentLoader, FeatureType } from 'adminjs';
import { HelperHashService } from '@/common/helpers/services';
import { AuthService } from '@/modules/auth/core/services';

export type AdminContext = {
  orm: MikroORM;
  em: EntityManager;
  componentLoader: ComponentLoader;
  services: {
    configService: ConfigService;
    authService: AuthService;
    helperHashService: HelperHashService;
  };
  licenseKey: string;
  relations: AdminRelations;
};

export type AdminRelations = {
  owningRelationSettingsFeature: (config: RelationsFeatureConfig) => FeatureType;
  targetRelationSettingsFeature: () => FeatureType;
  RelationType: typeof RelationType;
};
