import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENUM_DATABASE } from '@/common/database/constants';
import { ENUM_CONFIG_KEY } from '@/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      contextName: ENUM_DATABASE.Mongo,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: MikroOrmModuleOptions | undefined = configService.get(ENUM_CONFIG_KEY.Mongo);

        if (!config) throw new Error(`Missing Mongo config for key "${ENUM_CONFIG_KEY.Mongo}`);

        return config;
      },
    }),
  ],
})
export class MongoDatabaseModule {}
