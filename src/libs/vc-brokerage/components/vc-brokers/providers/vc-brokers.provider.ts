import {ConfigService} from "@nestjs/config";
import {LoggingService} from "@/libs/logging/services/logging.service";
import {BrokersStrategies, IVcBroker, IVcBrokersProvider, VcBrokers} from '../types';
import {SimpleBrokerService} from "@/libs/vc-brokerage/components/vc-brokers/services/simple-broker.service";
import {IMessagingClient, MessagingClient} from "@/libs/messaging/types";
import {IWalletsStorageClient, WalletsStorageClient} from "@/libs/wallets-storage-client/types";

export const VcBrokersProvider = {
  provide: VcBrokers,
  useFactory: (config: ConfigService,
               logger: LoggingService,
               messagingClient: IMessagingClient,
               walletsStorageClient: IWalletsStorageClient
               ): Promise<IVcBrokersProvider> =>
    vcBrokersProviderFactory(config, logger, messagingClient, walletsStorageClient),
  inject: [
    ConfigService,
    LoggingService,
    MessagingClient,
    WalletsStorageClient
  ],
};

async function  vcBrokersProviderFactory(
  config: ConfigService,
  logger: LoggingService,
  messagingClient: IMessagingClient,
  walletsStorageClient: IWalletsStorageClient
): Promise<IVcBrokersProvider> {
  const simpleBroker = new SimpleBrokerService(messagingClient, walletsStorageClient);

  return {
    getBroker: (brokerStrategy: BrokersStrategies): IVcBroker => {
      return simpleBroker;
    }
  }
}
