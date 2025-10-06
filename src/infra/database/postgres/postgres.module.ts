import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENUM_DATABASE } from '@/common/database/constants';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: ENUM_DATABASE.Postgres,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: MikroOrmModuleOptions | undefined = configService.get(ENUM_DATABASE.Postgres);

        if (!config) throw new Error(`Missing Postgres config for key "${ENUM_DATABASE.Postgres}"`);

        return config;
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
