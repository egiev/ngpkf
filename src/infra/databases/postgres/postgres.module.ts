import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfig } from '@/config/types';
import { Database } from '@/infra/databases';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: Database.Postgres,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<PostgresConfig>(Database.Postgres);

        if (!config) throw new Error(`Missing Postgres config for key "${Database.Postgres}"`);

        return config;
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
