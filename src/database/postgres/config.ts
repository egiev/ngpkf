import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';
import { Database } from '../database.enum';

const options: MikroOrmModuleSyncOptions = {
  contextName: Database.Postgres,
  registerRequestContext: false,
  driver: PostgreSqlDriver,
  dbName: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_HOST ? Number(process.env.POSTGRES_HOST) : 5432,
  entities: [
    path.join(__dirname, '../../../dist/database/postgres/**/*.entity.js'),
  ],
  entitiesTs: [path.join(__dirname, '../postgres/**/*.entity.ts')],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
};

export default options;
