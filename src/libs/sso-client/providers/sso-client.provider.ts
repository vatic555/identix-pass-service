import {ConfigService} from '@nestjs/config';

import {existsSync, readFile} from 'fs';
import {promisify} from 'util';

import {SSOClient, ISSOClient, SSOClientConfiguration} from "@/libs/sso-client/types";
import {LoggingService} from "@/libs/logging/services/logging.service";
import {Did} from "@/libs/vc-brokerage/types";
import {SsoClientService} from "@/libs/sso-client/services/sso-client.service";
import {SsoService} from "identix-sso-client-js";
import {MockIdentixSsoClientJsService} from "@/libs/sso-client/mocks/identix-sso-client-js.mock";

const readFileAsync = promisify(readFile);

export const SSOClientProvider = {
  provide: SSOClient,
  useFactory: (
    config: ConfigService,
    logger: LoggingService,
    ssoClientService: SsoClientService,
    mockSsoService: MockIdentixSsoClientJsService
  ): Promise<ISSOClient> => ssoClientFactory(config, logger, ssoClientService, mockSsoService),
  inject: [
    ConfigService,
    LoggingService,
    SsoClientService,
    MockIdentixSsoClientJsService
  ],
};

async function  ssoClientFactory(
  config: ConfigService,
  logger: LoggingService,
  ssoClientService: SsoClientService,
  mockSsoService: MockIdentixSsoClientJsService
): Promise<ISSOClient> {
  const ssoClientConfig = config.get<SSOClientConfiguration>('sso-client-configuration');
  if (!ssoClientConfig || !ssoClientConfig.clientToken) {
    throw new Error(`SSO Client configuration is invalid!`);
  }
  const ssoService = new SsoService(ssoClientConfig.ssoGraphqlApiUrl);
  ssoClientService.init(ssoService);

  return {
    validateUserSession: async (userSessionDid: Did): Promise<Did> => {
      return ssoClientService.validateUserSession(ssoClientConfig.clientToken, userSessionDid);
    }
  }
}
