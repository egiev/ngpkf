import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MongoDatabaseModule } from '@/infra/database/mongo';
import { PostgresDatabaseModule } from '@/infra/database/postgres';

@Module({ imports: [PostgresDatabaseModule, MongoDatabaseModule, MikroOrmModule.forMiddleware()] })
export class DatabaseModule {}
