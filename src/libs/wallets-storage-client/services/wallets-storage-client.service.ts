import {Did, VerificationStatuses} from "@/libs/vc-brokerage/types";
import { KeyValueType} from "@/libs/common/types";
import { IdentixWalletsStorageClient } from "@/libs/wallets-storage-client/clients/identix-wallets.client";
import {WalletsVCData} from "@/libs/wallets-storage-client/types";
import {faker} from "@faker-js/faker";
import {ClaimsGroup} from "@/libs/vc-brokerage/components/vc-brokers/types";

export class WalletsStorageService {
  constructor(
    protected readonly walletsStorageClient: IdentixWalletsStorageClient
  ) {}

  public async getOrCreateAccount(params: KeyValueType): Promise<Did[]> {
    return this.walletsStorageClient.getOrCreateAccount(params);
  }

  public async issuerVC(claims: ClaimsGroup[], issuerDid: Did): Promise<Did> {
    return this.walletsStorageClient.issuerVC(claims, issuerDid);
  }

  public async saveVC(vcDid: Did, issuerDid: Did, holderDid: Did, vcData: string, vcSecret: string): Promise<void> {
    return this.walletsStorageClient.saveVC(vcDid, issuerDid, holderDid, vcData, vcSecret);
  }

  async getUserVCs(userDid: Did): Promise<WalletsVCData[]> {
    return this.walletsStorageClient.getUserVCs(userDid);
  }

  async getVC(vcDid: Did): Promise<WalletsVCData> {
    return this.walletsStorageClient.getVC(vcDid);
  }

  async requestVcVerification(vcDid: Did, verifierDid: Did): Promise<boolean> {
    return this.walletsStorageClient.requestVcVerification(vcDid, verifierDid);
  }

  async verifyVC(vcDid: Did, verifierDid: Did, verificationStatus: VerificationStatuses): Promise<boolean> {
    return this.walletsStorageClient.verifyVC(vcDid, verifierDid, verificationStatus)
  }

  async generateVcDid(): Promise<{vcDid: Did, vcSecret: string}> {
    //return this.walletsStorageClient.generateVcDid();
    return {
      vcDid: `did:ever:vc:${faker.random.alphaNumeric(30)}`,
      vcSecret: faker.random.alphaNumeric(30)
    }
  }

  async signMessage(userDid: Did, msg: string): Promise<{signed: string, signature: string}> {
    return this.walletsStorageClient.signMessage(userDid, msg);
  }
}
