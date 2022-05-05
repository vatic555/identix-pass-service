import {Inject, UseGuards} from "@nestjs/common";
import {SsoAuthGuard} from "@/modules/authentication/guards/sso-auth.guard";
import {Args, Context, GqlExecutionContext, Query, Resolver} from '@nestjs/graphql';
import {UsersGraphqlApiService} from '@/modules/graphql-api/users/services/users.graphql-api.service';
import {Did} from "@/libs/vc-brokerage/types";
import {
  AgentsSessionsRegistry,
  IAgentsSessionsRegistry
} from "@/libs/vc-brokerage/components/agents-sessions-registry/types";

@UseGuards(SsoAuthGuard)
@Resolver('Users')
export class UsersGraphqlApiResolvers {
  constructor(private usersService: UsersGraphqlApiService) {
  }

  @Query(returns => [String])
  async getAllAccounts() {
    return this.usersService.getAllAccounts();
  }

  @Query(returns => Boolean)
  async checkAccountExists(
    @Args('did', {type: () => String}) did: Did
  ) {
    return this.usersService.checkAccountExists(did);
  }

  @Query(returns => String)
  async whoami(@Context('req') req: { userDid?: string }): Promise<Did> {
    return req?.userDid;
  }
}
