import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelperModule } from '@/common/helpers/helper.module';
import config from '@/config';
import { getEnvFilePath } from '@/config/utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: config,
      expandVariables: true,
    }),
    HelperModule,
  ],
  exports: [HelperModule],
})
export class CommonModule {}
