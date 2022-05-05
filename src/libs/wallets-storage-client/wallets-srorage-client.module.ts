import {Module} from '@nestjs/common';

import {LoggingModule} from "@/libs/logging/logging.module";
import {WalletsStorageClientProvider} from "@/libs/wallets-storage-client/providers/wallets-storage-client.provider";
import {ConfigModule} from "@nestjs/config";
import WalletsStorageConfigurationFactory from './factories/wallets-storage-configuration.factory';

@Module({
  imports: [
    ConfigModule.forFeature(WalletsStorageConfigurationFactory),
    LoggingModule.forRoot({serviceName: 'VC Storage module'})
  ],
  providers: [WalletsStorageClientProvider],
  exports: [WalletsStorageClientProvider]
})
export class WalletsSrorageClientModule {}
