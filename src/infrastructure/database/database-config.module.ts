import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mongoConfig from './mongo/config';
import postgresConfig from './postgres/config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mongoConfig),
    MikroOrmModule.forRoot(postgresConfig),
    MikroOrmModule.forMiddleware(),
  ],
})
export class DatabaseConfigModule {}
