import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';
import { Patient } from './entities';

const options: MikroOrmModuleSyncOptions = {
  contextName: 'mongo',
  registerRequestContext: false,
  driver: MongoDriver,
  dbName: process.env.MONGO_NAME,
  clientUrl: process.env.MONGO_URI,
  entities: [
    path.join(__dirname, '../../../dist/database/mongo/**/*.entity.js'),
  ],
  entitiesTs: [Patient],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  debug: true,
};

export default options;
