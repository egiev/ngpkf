import { MikroORM, MongoDriver } from '@mikro-orm/mongodb';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { ENUM_CONFIG_KEY } from '@/configs/constants';
import { SampleOrmEntity } from '@/infra/database/mongo/entities';

export const mongoConfig = {
  driver: MongoDriver,
  registerRequestContext: false,
  dbName: process.env.MONGODB_NAME,
  clientUrl: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?directConnection=true&authSource=${process.env.MONGODB_AUTHENTICATION_SOURCE}&authMechanism=${process.env.MONGODB_AUTH_MECHANISM}`,
  entities: [SampleOrmEntity],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: join(__dirname, '../infra/database/mongo/migrations'),
    glob: '!(*.d).{js,ts}',
  },
};

export const init = async () => {
  const orm = await MikroORM.init(mongoConfig);
  return orm;
};

export default registerAs(ENUM_CONFIG_KEY.Mongo, () => mongoConfig);
