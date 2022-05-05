import {Connection} from 'typeorm';
import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {DatabaseModule} from "@/libs/database/database.module";
import {LoggingModule} from "@/libs/logging/logging.module";
import {AppLoggerMiddleware} from "@/libs/logging/middlewares/app-logger.middleware";
import {GraphQLAppModule} from "@/libs/graphql/graphql.module";
import {GraphQLApiModule} from "@/modules/graphql-api/graphql-api.module";
import {AuthenticationModule} from "@/modules/authentication/authentication.module";
import {MessagingModule} from "@/libs/messaging/messaging.module";
import {AgentsSessionsRegistryModule} from "@/libs/vc-brokerage/components/agents-sessions-registry/agents-sessions-registry.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLAppModule.forRoot(),
    LoggingModule.forRoot({serviceName: 'Nest.JS GraphQL API'}),
    GraphQLApiModule,
    AuthenticationModule,
    MessagingModule
  ],
  providers: [],
  controllers: []
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
