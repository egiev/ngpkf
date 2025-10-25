import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from '@/auth-user/presentation/graphql/user.graphql.resolver';
import { UserModule } from '@/auth-user/user.module';
import { AuthModule } from '@/common/auth/auth.module';

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
    UserModule,
  ],
  providers: [UserResolver],
})
export class GraphqlApiModule {}
