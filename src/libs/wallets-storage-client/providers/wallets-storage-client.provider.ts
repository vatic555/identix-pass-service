import { ConfigService } from '@nestjs/config';

import {
  WalletsStorageClient,
  WalletsStorageConfiguration,
  IWalletsStorageClient
} from "../types";
import { IdentixWalletsStorageClient } from "@/libs/wallets-storage-client/clients/identix-wallets.client";
import { WalletsStorageService } from "@/libs/wallets-storage-client/services/wallets-storage-client.service";

export const WalletsStorageClientProvider = {
  provide: WalletsStorageClient,
  useFactory: (config: ConfigService): IWalletsStorageClient => walletsStorageClientFactory(config),
  inject: [ConfigService],
};

function walletsStorageClientFactory(
  config: ConfigService
): IWalletsStorageClient {
  const walletsStorageConfig = config.get<WalletsStorageConfiguration>('wallets-storage-configuration');
  if (!walletsStorageConfig || !walletsStorageConfig.walletsStorageUrl || !walletsStorageConfig.walletsApiToken) {
    throw new Error(`Wallets storage configuration is invalid!`);
  }

  const walletsStorageClient = new IdentixWalletsStorageClient(walletsStorageConfig);
  return new WalletsStorageService(walletsStorageClient);
}
