import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';
import { Database } from '../database.enum';

const options: MikroOrmModuleSyncOptions = {
  contextName: Database.Mongo,
  registerRequestContext: false,
  driver: MongoDriver,
  dbName: process.env.MONGO_NAME,
  clientUrl: process.env.MONGO_URI,
  entities: [
    path.join(__dirname, '../../../dist/database/mongo/**/*.entity.js'),
  ],
  entitiesTs: [path.join(__dirname, '../mongo/**/*.entity.ts')],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  debug: true,
};

export default options;
