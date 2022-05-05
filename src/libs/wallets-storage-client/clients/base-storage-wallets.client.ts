import {IWalletsStorageClient, WalletsVCData} from "@/libs/wallets-storage-client/types";
import {Did, VerificationStatuses} from "@/libs/vc-brokerage/types";
import { KeyValueType } from "@/libs/common/types";
import {ClaimsGroup} from "@/libs/vc-brokerage/components/vc-brokers/types";

export class BaseStorageWalletsClient implements IWalletsStorageClient {
  constructor() {}

  public async getOrCreateAccount(params: KeyValueType): Promise<Did[]> {
    return;
  }

  public async issuerVC(claims: ClaimsGroup[], issuerDid: Did): Promise<Did> {
    return;
  }

  public async saveVC(vcDid: Did, issuerDid: Did, holderDid: Did, vcData: string, vcSecret: string): Promise<void> {
    return;
  }

  public async getUserVCs(userDid: Did): Promise<WalletsVCData[]> {
    return
  }

  public async getVC(vcDid: Did): Promise<WalletsVCData> {
    return;
  }

  async requestVcVerification(vcDid: Did, verifierDid: Did): Promise<boolean> {
    return true
  }

  async verifyVC(vcDid: Did, verifierDid: Did, verificationStatus: VerificationStatuses): Promise<boolean> {
    return true
  }

  async generateVcDid(): Promise<{vcDid: Did, vcSecret: string}> {
    return;
  }

  async signMessage(userDid: Did, msg: string): Promise<{signed: string, signature: string}> {
    return;
  }
}
