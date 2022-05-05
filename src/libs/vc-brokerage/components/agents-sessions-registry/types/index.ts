import {IVcSchema, Did, IVcMessage, IIssueVcProperties} from "@/libs/vc-brokerage/types";
import {AgentService} from "@/libs/vc-brokerage/components/agents-sessions-registry/services/agent.service";

export const AgentsSessionsRegistry = 'AGENTS_SESSION_REGISTRY';

export interface IAgent {
  configure: (did: Did, vcIssuerSchemas: IVcSchema[]) => void;
  subscribe: (queue: string, handler: () => Promise<void>, checkDuration?: number) => void;
  issueVc: (holderDid: Did, vcSchemeDid: Did, properties: IIssueVcProperties) => Promise<IVcMessage>;
  verifyVc: (holderDid: Did, consumerDid: Did, vcDid: Did) => Promise<void>;
  requestVcVerification: (vcDid: Did, verifierDid: Did) => Promise<boolean>;
}

export interface IAgentsSessionsRegistry {
  createAgentSession: (userDid: Did) => void;
  deleteAgentSession: (userDid: Did) => void;
  getAgent: (userDid: Did) => AgentService;
  getAllAgentsSessionsDids: () =>  Did[];
}
