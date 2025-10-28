import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@/auth';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        path: '/graphql',
        autoSchemaFile: true,
        playground: configService.get<string>('NODE_ENV') === 'prod' ? false : true,
        introspection: configService.get<boolean>('GRAPHQL_INTROSPECTION_ENABLED'),
        debug: configService.get<boolean>('GRAPHQL_DEBUG_ENABLED'),
      }),
    }),
    AuthModule,
  ],
  providers: [],
})
export class GraphqlApiModule {}
