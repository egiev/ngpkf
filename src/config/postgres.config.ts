import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { ENUM_CONFIG_KEY } from '@/config/constants';
import {
  GroupEntity,
  GroupPermissionEntity,
  PermissionEntity,
  UserEntity,
  UserGroupEntity,
  UserPermissionEntity,
} from '@/modules/user/core/entities';

export const postgresConfig: Record<string, any> = {
  driver: PostgreSqlDriver,
  registerRequestContext: false,
  dbName: process.env.POSTGRES_NAME,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD,
  entities: [UserEntity, GroupEntity, PermissionEntity, UserGroupEntity, UserPermissionEntity, GroupPermissionEntity],
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
