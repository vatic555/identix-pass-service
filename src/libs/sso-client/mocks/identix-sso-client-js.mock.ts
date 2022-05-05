import {Did, UserInfo, ISsoService} from "identix-sso-client-js/src/ISsoService";
import {Inject} from "@nestjs/common";
import {WalletsStorageClient, IWalletsStorageClient} from "@/libs/wallets-storage-client/types";

export class MockIdentixSsoClientJsService implements ISsoService {
  private didSessionsStorage: Map<Did, {did: Did, createdAt: Date}>
    = new Map<Did, {did: Did, createdAt: Date}>();
  private expiringDurationInSec: number = 24 * 3600; //24 hours

  constructor(@Inject(WalletsStorageClient) private walletsStorageClient: IWalletsStorageClient) {
  }

  async requestClientLogin(clientDidOrRefreshToken: Did): Promise<Did> {
   return;
  }

  async attemptClientLogin(clientDid: Did, signature: string): Promise<Did> {
    return;
  }

  async validateUserSession(clientSessionDid: Did, userSessionDid: Did): Promise<void> {
    if (this.didSessionsStorage.has(userSessionDid)) {
      const session = this.didSessionsStorage.get(userSessionDid);
      const sessionCreatedAt = session.createdAt;
      if (sessionCreatedAt.getTime() + this.expiringDurationInSec * 1000 > (new Date()).getTime()) {
        return;
      }

      this.didSessionsStorage.delete(userSessionDid);
    }

    const createAccountParams = { web2: { method: "clientId", identifier: userSessionDid } };
    const userDid =
      (await this.walletsStorageClient.getOrCreateAccount(createAccountParams)).shift();

    this.didSessionsStorage.set(userSessionDid, {did: userDid, createdAt: new Date()})
  }

  async getCurrentUserInfo(clientSessionDid: Did, userSessionDid: Did): Promise<UserInfo> {
    const session = this.didSessionsStorage.get(userSessionDid);
    return { did: String(session.did) }
  }
}
