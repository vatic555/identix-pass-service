import {Args, Context, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {VCBrokerageGraphqlApiService} from "@/modules/graphql-api/vc-brokerage/services/vc-brokerage.graphql-api.service";
import {UseGuards} from "@nestjs/common";
import {SsoAuthGuard} from "@/modules/authentication/guards/sso-auth.guard";
import {AgentsRoles, Did, EventLogEntry, VC, VerificationStatuses} from "@/libs/vc-brokerage/types";
import {VcTypeInfo} from "../types";

@UseGuards(SsoAuthGuard)
@Resolver('VCBrokerage')
export class VcBrokerageGraphqlApiResolvers {
  constructor(
    private vcBrokerageGraphqlAPIService: VCBrokerageGraphqlApiService,
  ) {
  }

  @Query(returns => [VcTypeInfo])
  async getVcTypes(@Context('req') req: { userDid?: string }) {
    return this.vcBrokerageGraphqlAPIService.getVcTypes(req?.userDid);
  }

  @Mutation(returns => Boolean)
  async issuerVC(
    @Context('req') req: { userDid?: string },
    @Args('holderDid', {type: () => String}) holderDid: string,
    @Args('vcTypeDid', {type: () => String}) vcTypeDid: string,
    @Args('vcParams', {type: () => String}) vcParams: string
  ): Promise<boolean>
  {
    return this.vcBrokerageGraphqlAPIService.issuerVc(req?.userDid, holderDid, vcTypeDid, vcParams);
  }

  @Query(returns => [VC])
  async getUserVCs(
    @Context('req') req: { userDid?: string },
    @Args('role', {type: () => AgentsRoles, nullable: true}) role?: AgentsRoles,
    @Args('startIndex', {type: () => Int, nullable: true}) startIndex?: number,
    @Args('count', {type: () => Int, nullable: true}) count?: number
  ) {
    return this.vcBrokerageGraphqlAPIService.getUserVCs(req?.userDid, role, startIndex, count);
  }

  @Query(returns => VC)
  async getVC(
    @Context('req') req: { userDid?: string },
    @Args('vcDid', {type: () => String}) vcDid: string
  ) {
    return this.vcBrokerageGraphqlAPIService.getVC(req?.userDid, vcDid);
  }

  @Mutation(returns => Boolean)
  async requestVcVerification(
    @Context('req') req: { userDid?: string },
    @Args('vcDid', {type: () => String}) vcDid: Did,
    @Args('verifierDid', {type: () => String}) verifierDid: Did): Promise<boolean>
  {
    return this.vcBrokerageGraphqlAPIService.requestVcVerification(req?.userDid, vcDid, verifierDid);
  }

  @Mutation(returns => Boolean)
  async verifyVC(
    @Context('req') req: { userDid?: string },
    @Args('vcDid', {type: () => String}) vcDid: Did,
    @Args('verificationStatus',
      {type: () => String}) verificationStatus: VerificationStatuses): Promise<boolean>
  {
    return this.vcBrokerageGraphqlAPIService.verifyVc(req?.userDid, vcDid, verificationStatus);
  }

  @Query(returns => [EventLogEntry])
  async getEventLogEntries(
    @Context('req') req: { userDid?: string },
    @Args('startIndex', {type: () => Int, nullable: true}) startIndex?: number,
    @Args('count', {type: () => Int, nullable: true}) count?: number
  ): Promise<EventLogEntry[]>
  {
    return this.vcBrokerageGraphqlAPIService.getEventLog(req?.userDid);
  }
}
