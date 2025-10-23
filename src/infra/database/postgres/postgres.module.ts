import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENUM_DATABASE } from '@/common/database/constants';
import { ENUM_CONFIG_KEY } from '@/configs';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: ENUM_DATABASE.Postgres,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: MikroOrmModuleOptions | undefined = configService.get(ENUM_CONFIG_KEY.Postgres);

        if (!config) throw new Error(`Missing Postgres config for key "${ENUM_CONFIG_KEY.Postgres}`);

        return config;
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
