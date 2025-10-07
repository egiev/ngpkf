import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostgresDatabaseModule } from '@/infra/database/postgres';

@Module({ imports: [PostgresDatabaseModule, MikroOrmModule.forMiddleware()] })
export class DatabaseModule {}
