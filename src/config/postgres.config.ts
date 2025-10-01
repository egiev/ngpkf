import { registerAs } from '@nestjs/config';
import { CONFIG_KEYS } from './keys';
import { PostgresConfig } from './types';

export default registerAs(
  CONFIG_KEYS.postgres,
  (): PostgresConfig => ({
    dbName: process.env.POSTGRES_NAME!,
    host: process.env.POSTGRES_HOST!,
    port: +process.env.POSTGRES_PORT!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  }),
);
