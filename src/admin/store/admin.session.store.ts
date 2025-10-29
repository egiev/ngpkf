/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Connect from 'connect-pg-simple';
import session from 'express-session';
import { AdminContext } from '@/admin/common/types';

export function createSessionStore({ services: { configService } }: AdminContext) {
  const dbHost = configService.get('POSTGRES_HOST');
  const dbPort = configService.get('POSTGRES_PORT');
  const dbUser = configService.get('POSTGRES_USER');
  const dbPassword = configService.get('POSTGRES_PASSWORD');
  const dbName = configService.get('POSTGRES_NAME');
  const cookieName = configService.get('ADMIN_COOKIE_NAME');
  const cookieSecret = configService.get('ADMIN_COOKIE_PASSWORD');

  if (!dbHost || !dbPort || !dbUser || !dbPassword || !dbName) {
    throw new Error('Database configuration is missing');
  }

  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  });

  return {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: cookieSecret,
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
    name: cookieName,
  };
}
