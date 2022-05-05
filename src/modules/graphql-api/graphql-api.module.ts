import {Module} from '@nestjs/common';

import {UsersGraphqlApiModule} from "@/modules/graphql-api/users/users.graphql-api.module";
import {VcBrokerageGraphqlApiModule} from "@/modules/graphql-api/vc-brokerage/vc-brokerage.graphql-api.module";

@Module({
  imports: [
    UsersGraphqlApiModule,
    VcBrokerageGraphqlApiModule
  ],
  providers: [],
  exports: []
})
export class GraphQLApiModule {}