import { RelationsFeatureConfig, RelationType } from '@adminjs/relations';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { ComponentLoader, FeatureType } from 'adminjs';
import { LoginWithCredentialsUseCase } from '@/auth/application';
import { HashingPort, IdGeneratorPort } from '@/common/helpers/ports';

export type AdminContext = {
  orm: MikroORM;
  postgresEm: EntityManager;
  componentLoader: ComponentLoader;
  services: {
    configService: ConfigService;
    loginWithCredentialsUseCase: LoginWithCredentialsUseCase;
    hashingService: HashingPort;
    idGeneratorService: IdGeneratorPort;
  };
  licenseKey: string;
  relations: AdminRelations;
};

export type AdminRelations = {
  owningRelationSettingsFeature: (config: RelationsFeatureConfig) => FeatureType;
  targetRelationSettingsFeature: () => FeatureType;
  RelationType: typeof RelationType;
};
