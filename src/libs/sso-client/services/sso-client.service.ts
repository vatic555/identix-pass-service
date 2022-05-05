import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ISSOClientService, ISsoNpmService} from "@/libs/sso-client/types";
import {ISsoService} from "identix-sso-client-js/src/ISsoService";
import {Did} from "@/libs/vc-brokerage/types";
import {faker} from "@faker-js/faker";

@Injectable()
export class SsoClientService implements ISSOClientService{
  private ssoService: ISsoService;
  private didSessionsStorage: Map<Did, {did: Did, createdAt: Date}>
    = new Map<Did, {did: Did, createdAt: Date}>();
  private expiringDurationInSec: number = 24 * 3600; //24 hours

  init(ssoService: ISsoService): void {
    this.ssoService = ssoService;
  }

  public async registerSession(clientDid: Did): Promise<Did> {
    const sessionTokenDid = `did:ever:session:${faker.random.alphaNumeric(30)}`;
    return sessionTokenDid;

  }

  public async validateUserSession(clientSessionDid: Did, userSessionDid: Did): Promise<Did> {
    if (this.didSessionsStorage.has(userSessionDid)) {
      const session = this.didSessionsStorage.get(userSessionDid);
      const sessionCreatedAt = session.createdAt;
      if (sessionCreatedAt.getTime() + this.expiringDurationInSec * 1000 > (new Date()).getTime()) {
        return session.did;
      }

      this.didSessionsStorage.delete(userSessionDid);
    }

    let userDid;
    try {
      await this.ssoService.validateUserSession(clientSessionDid, userSessionDid);
      const userInfo = await this.ssoService.getCurrentUserInfo(clientSessionDid, userSessionDid);
      userDid = userInfo?.did;
    } catch (e) {
      throw new UnauthorizedException();
    }

    if (!userDid) {
      throw new UnauthorizedException();
    }

    this.didSessionsStorage.set(userSessionDid, {did: userDid, createdAt: new Date()})

    return userDid;
  }
}
