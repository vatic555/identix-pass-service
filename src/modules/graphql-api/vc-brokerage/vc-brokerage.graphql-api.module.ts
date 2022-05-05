import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {EventLogEntity, UsersEntity} from "@/libs/database/entities";
import {LoggingModule} from "@/libs/logging/logging.module";
import {VCBrokerageGraphqlApiService} from "@/modules/graphql-api/vc-brokerage/services/vc-brokerage.graphql-api.service";
import {VcBrokerageGraphqlApiResolvers} from "@/modules/graphql-api/vc-brokerage/resolvers/vc-brokerage.graphql-api.resolvers";
import {AgentsSessionsRegistryModule} from "@/libs/vc-brokerage/components/agents-sessions-registry/agents-sessions-registry.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, EventLogEntity]),
    LoggingModule.forRoot({serviceName: 'VC Brokerage Graphql Api module'}),
    AgentsSessionsRegistryModule
  ],
  providers: [VcBrokerageGraphqlApiResolvers, VCBrokerageGraphqlApiService],
  exports: [VCBrokerageGraphqlApiService]
})
export class VcBrokerageGraphqlApiModule {}
