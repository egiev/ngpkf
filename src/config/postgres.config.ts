import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import {
  GroupEntity,
  GroupPermissionEntity,
  PermissionEntity,
  UserEntity,
  UserGroupEntity,
  UserPermissionEntity,
} from '@/modules/user/entities';
import { CONFIG_KEYS } from './keys';
import { PostgresConfig } from './types';

export const postgresConfig = {
  driver: PostgreSqlDriver,
  registerRequestContext: false,
  dbName: process.env.POSTGRES_NAME!,
  host: process.env.POSTGRES_HOST!,
  port: +process.env.POSTGRES_PORT!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  entities: [UserEntity, GroupEntity, PermissionEntity, UserGroupEntity, UserPermissionEntity, GroupPermissionEntity],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: join(__dirname, '../infra/databases/postgres/migrations'),
    glob: '!(*.d).{js,ts}',
  },
};

export default registerAs(CONFIG_KEYS.postgres, (): PostgresConfig => postgresConfig);
