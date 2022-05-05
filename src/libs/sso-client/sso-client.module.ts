import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {LoggingModule} from '@/libs/logging/logging.module';

import SSOClientConfigurationFactory from './factories/sso-client-configuration.factory';
import {SSOClientProvider} from './providers/sso-client.provider';
import {SsoClientService} from "@/libs/sso-client/services/sso-client.service";
import {WalletsSrorageClientModule} from "@/libs/wallets-storage-client/wallets-srorage-client.module";
import {MockIdentixSsoClientJsService} from "@/libs/sso-client/mocks/identix-sso-client-js.mock";

@Module({
  imports: [
    ConfigModule.forFeature(SSOClientConfigurationFactory),
    LoggingModule.forRoot({ serviceName: 'SSO Client' }),
    WalletsSrorageClientModule
  ],
  providers: [SSOClientProvider, SsoClientService, MockIdentixSsoClientJsService],
  exports: [SSOClientProvider],
})
export class SsoClientModule {}
