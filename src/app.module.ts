import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@/config';
import { getEnvFilePath } from '@/config/utils';
import { PostgresDatabaseModule } from '@/infra/database/postgres';
import { KafkaModule } from '@/infra/kafka';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: config,
      expandVariables: true,
    }),
    KafkaModule,

    PostgresDatabaseModule,
    MikroOrmModule.forMiddleware(),

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
