import {ForbiddenException, Inject, Injectable} from "@nestjs/common";
import {AgentsRoles, Did, EventLogEntry, VC, VerificationStatuses} from "@/libs/vc-brokerage/types";
import {
  AgentsSessionsRegistry,
  IAgentsSessionsRegistry
} from "@/libs/vc-brokerage/components/agents-sessions-registry/types";
import {WalletsVCData} from "@/libs/wallets-storage-client/types";
import {AgentService} from "@/libs/vc-brokerage/components/agents-sessions-registry/services/agent.service";
import {InjectRepository} from "@nestjs/typeorm";
import {EventLogEntity} from "@/libs/database/entities";
import {Repository} from "typeorm";

@Injectable()
export class VCBrokerageGraphqlApiService {
  constructor(
    @Inject(AgentsSessionsRegistry) private agentsSessionsRegistry: IAgentsSessionsRegistry,
    @InjectRepository(EventLogEntity) private eventLogRepository: Repository<EventLogEntity>
  ) {}

  async getVcTypes(userDid: Did): Promise<{vcTypeDid: Did, vcTypeTag: string}[]> {
    const userAgent = this.agentsSessionsRegistry.getAgent(userDid);
    if (!userAgent) {
      throw new Error('Issuer agent session not found');
    }

    const vcTypeSchemes = await userAgent.getVcTypeSchemes(userDid);
    if (!Array.isArray(vcTypeSchemes)) {
      return [];
    }

    return vcTypeSchemes.map(sch => ({vcTypeDid: sch.did, vcTypeTag: sch.key}));
  }

  async issuerVc(issuerDid: Did, holderDid: Did, vcTypeDid: Did, vcParams: string): Promise<boolean> {
    const issuerAgent = this.agentsSessionsRegistry.getAgent(issuerDid);
    if (!issuerAgent) {
      throw new Error('Issuer agent session not found');
    }

    const holderAgent = this.agentsSessionsRegistry.getAgent(holderDid);
    if (!holderAgent) {
      await this.agentsSessionsRegistry.createAgentSession(holderDid);
    }

    await issuerAgent.issuerVc(issuerDid, holderDid, vcTypeDid, vcParams);

    return true;
  }

  async getVC(userDid: Did, vcDid: Did): Promise<VC> {
    const userAgent = this.agentsSessionsRegistry.getAgent(userDid);
    if (!userAgent) {
      throw new Error('User agent session not found');
    }

    const vc: WalletsVCData = await this.getVCAndAuthorize(vcDid, userDid, userAgent);

    return JSON.parse(vc.vcData);
  }

  async getUserVCs(userDid: Did, role?: AgentsRoles, page?: number, limit?: number): Promise<VC[]> {
    const userAgent = this.agentsSessionsRegistry.getAgent(userDid);
    if (!userAgent) {
      throw new Error('User agent session not found');
    }

    const userVCs = (await userAgent.getUserVCs(userDid)).map(wvc => JSON.parse(wvc.vcData));

    if (role) {
      return userVCs.filter(vc => this.checkUserHasRoleInVC(vc, userDid, role));
    }

    return userVCs;
  }

  async requestVcVerification(userDid: Did, vcDid: Did, verifierDid: Did): Promise<boolean> {
    const userAgent = this.agentsSessionsRegistry.getAgent(userDid);
    if (!userAgent) {
      throw new Error('User agent session not found');
    }

    await this.getVCAndAuthorize(vcDid, userDid, userAgent);

    return !!(await userAgent.requestVcVerification(vcDid, verifierDid));
  }

  async verifyVc(
    userDid: Did,
    vcDid: Did,
    verificationStatus: VerificationStatuses
  ): Promise<boolean> {
    const userAgent = this.agentsSessionsRegistry.getAgent(userDid);
    if (!userAgent) {
      throw new Error('User agent session not found');
    }

    await this.getVCAndAuthorize(vcDid, userDid, userAgent, AgentsRoles.verifier);

    const verifierDid = userDid;

    return !!(await userAgent.verifyVc(vcDid, verifierDid, verificationStatus));
  }

  async getEventLog(userDid: Did): Promise<EventLogEntry[]> {
    const userVCs = await this.getUserVCs(userDid);
    const userVCsDids = userVCs.map(vc => vc.vcDid);

    const eventLog: EventLogEntity[] = [];
    for await (const vcDid of userVCsDids) {
      const vcEventLogs = await this.eventLogRepository.find({ where: { vcDid }});
      eventLog.push(...vcEventLogs);
    }

    return eventLog.sort(this.compareByDate).map(evl => ({
      id: evl.id,
      ownerDid: evl.ownerDid,
      vcDid: evl.vcDid,
      eventType: evl.eventType,
      message: evl.message,
      eventDate: evl.createdAt
    }));
  }

  private async getVCAndAuthorize(
    vcDid: Did, userDid: Did,
    userAgent: AgentService,
    userRoleShouldBe?: AgentsRoles
  ): Promise<WalletsVCData> {
    const vc: WalletsVCData = await userAgent.getVC(vcDid);

    if (!vc) {
      throw new Error(`VC not fount. Params: ${JSON.stringify({vcDid})}`)
    }

    if (!this.checkUserHasRoleInVC(vc, userDid, userRoleShouldBe)) {
      throw new ForbiddenException();
    }

    return vc;
  }

  private checkUserHasRoleInVC(vc: WalletsVCData, userDid: Did, role?: AgentsRoles): boolean {
    const checkUserAsIssuer = vc.issuerDid === userDid;
    const checkUserAsHolder = vc.holderDid === userDid;
    const checkUserAsVerifier = Array.isArray(vc.verificationCases) &&
      vc.verificationCases.filter(vcc => vcc.verifierDid === userDid).length > 0;

    if (!role) {
      if (!checkUserAsIssuer && !checkUserAsHolder && !checkUserAsVerifier) {
        return false;
      }
    } else {
      if (role === AgentsRoles.issuer && !checkUserAsIssuer) {
        return false
      }
      if (role === AgentsRoles.holder && !checkUserAsHolder) {
        return false;
      }
      if (role === AgentsRoles.verifier && !checkUserAsVerifier) {
        return false;
      }
    }

    return true
  }

  private compareByDate(a: EventLogEntity, b: EventLogEntity): -1|1|0 {
    if ( a.createdAt < b.createdAt ){
      return -1;
    }
    if ( a.createdAt > b.createdAt ){
      return 1;
    }
    return 0;
  }
}
