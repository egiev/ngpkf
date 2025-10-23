import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphqlApiModule, HttpApiModule } from '@/apis';
import { JwtAuthGuard } from '@/common/auth/presentation/guards/auth.guard';
import { PermissionGuard } from '@/common/auth/presentation/guards/permission.guard';
import { CommonModule } from '@/common/common.module';
import config from '@/configs';
import { getEnvFilePath } from '@/configs/utils';
import { InfraModule } from '@/infra/infra.module';

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
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule {}
