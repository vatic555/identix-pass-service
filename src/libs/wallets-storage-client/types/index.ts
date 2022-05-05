import {Did} from "@/libs/vc-brokerage/types";
import {KeyValueType} from "@/libs/common/types";
import {VerificationStatuses} from "@/libs/vc-brokerage/types";
import {ClaimsGroup} from "@/libs/vc-brokerage/components/vc-brokers/types";


export enum WalletsStorageKinds {
  identixWalletsStorage = 'IDENTIX_WALLETS_STORAGE',
}

export const WalletsStorageClient = 'WALLETS_STORAGE_CLIENT';

export interface IWalletsStorageClient {
  getOrCreateAccount: (params: KeyValueType) => Promise<Did[]>;
  issuerVC: (claims: ClaimsGroup[], issuerDid: Did) => Promise<Did>;
  saveVC: (vcDid: Did, issuerDid: Did, holderDid: Did, vcData: string, vcSecret: string) => Promise<void>;
  getUserVCs: (userDid: Did) =>  Promise<WalletsVCData[]>;
  getVC: (vcDid: Did) => Promise<WalletsVCData>;
  requestVcVerification: (vcDid: Did, verifierDid: Did) => Promise<boolean>;
  verifyVC: (vcDid: Did, verifierDid: Did, verificationStatus: VerificationStatuses) => Promise<boolean>;
  generateVcDid: () => Promise<{vcDid: Did, vcSecret: string}>;
  signMessage: (userDid: Did, msg: string) => Promise<{signed: string, signature: string}>;
}

export type WalletsStorageConfiguration = {
  walletsStorageUrl: string;
  walletsApiToken: string;
}

export interface WalletsVCData {
  vcDid: Did,
  vcData: Did,
  issuerDid: Did,
  holderDid: string,
  verificationCases: {
    verifierDid: Did,
    verificationStatus: VerificationStatuses
  }[]
}
