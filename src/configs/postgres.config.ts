import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { ServiceAccountEntity } from '@/api-key/infrastructure/persisntence/entities/service-account.entity';
import {
  GroupEntity,
  GroupPermissionEntity,
  PermissionEntity,
  UserEntity,
  UserGroupEntity,
  UserPermissionEntity,
} from '@/auth-user/infrastructure/persistence/entities';
import { ENUM_CONFIG_KEY } from '@/configs/constants';

export const postgresConfig = {
  driver: PostgreSqlDriver,
  registerRequestContext: false,
  dbName: process.env.POSTGRES_NAME,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    UserEntity,
    GroupEntity,
    PermissionEntity,
    UserGroupEntity,
    UserPermissionEntity,
    GroupPermissionEntity,
    ServiceAccountEntity,
  ],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: join(__dirname, '../infra/database/postgres/migrations'),
    glob: '!(*.d).{js,ts}',
  },
};

export const init = async () => {
  const orm = await MikroORM.init(postgresConfig);
  return orm;
};

export default registerAs(ENUM_CONFIG_KEY.Postgres, () => postgresConfig);
