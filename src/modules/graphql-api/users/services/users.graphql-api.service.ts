import {Inject, Injectable} from "@nestjs/common";
import {Did} from "@/libs/vc-brokerage/types";
import {
  AgentsSessionsRegistry,
  IAgentsSessionsRegistry
} from "@/libs/vc-brokerage/components/agents-sessions-registry/types";

@Injectable()
export class UsersGraphqlApiService {
  constructor(
    @Inject(AgentsSessionsRegistry) private agentsSessionsRegistry: IAgentsSessionsRegistry
  ) {}

  async checkAccountExists(did: Did): Promise<boolean> {
    return !!this.agentsSessionsRegistry.getAgent(did);
  }

  async getAllAccounts(): Promise<Did[]> {
    return this.agentsSessionsRegistry.getAllAgentsSessionsDids();
  }
}
