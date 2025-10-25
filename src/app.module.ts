import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphqlApiModule, HttpApiModule } from '@/apis';
import { CommonModule } from '@/common';
import config from '@/configs';
import { getEnvFilePath } from '@/configs/utils';
import { InfraModule } from '@/infra';
import { AppGuard } from './app.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: config,
      expandVariables: true,
    }),
    CommonModule,
    InfraModule,

    HttpApiModule,
    GraphqlApiModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
