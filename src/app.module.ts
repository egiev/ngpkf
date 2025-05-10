import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FileModule } from '@presentation/file';
import { PatientModule } from '@presentation/patient';
import { UserModule } from '@presentation/user';
import { DatabaseConfigModule } from '@infrastructure/database';

@Module({
  imports: [
    DatabaseConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    UserModule,
    PatientModule,
    FileModule,
  ],
})
export class AppModule {}
