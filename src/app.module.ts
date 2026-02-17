import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AuthModule } from '@/auth';
import { CommonModule } from '@/common';
import config from '@/configs';
import { getEnvFilePath } from '@/configs/utils';
import { InfraModule } from '@/infra';
import { HttpApiModule } from './apis';
import { AppGuard } from './app.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: config,
      expandVariables: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 60 }],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: `${process.env.PROJECT_BASE_PATH}/assets`,
    }),
    CommonModule,
    InfraModule,
    AuthModule,
    HttpApiModule,
    // GraphqlApiModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule {}
