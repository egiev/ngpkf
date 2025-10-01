import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PostgresConfig } from '@/config/types';
import { Database } from '@/infra/databases';
import { User } from '@/infra/databases/postgres/user.entity';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: Database.Postgres,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConnection = configService.get<PostgresConfig>(Database.Postgres);

        return {
          driver: PostgreSqlDriver,
          registerRequestContext: false,
          ...dbConnection,
          entities: [User],
          metadataProvider: TsMorphMetadataProvider,
          migrations: {
            path: join(__dirname, './migrations'),
            glob: '!(*.d).{js,ts}',
          },
        };
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
