import {ConfigService} from "@nestjs/config";
import {LoggingService} from "@/libs/logging/services/logging.service";
import {MessagingClient, IMessagingClient, MessagesStatuses} from "../types";
import {LocalStorageMessagingClient} from "@/libs/messaging/clients/local-storage-messaging.client";
import {MessagingService} from "@/libs/messaging/services/messaging.service";

export const MessagingClientProvider = {
  "provide": MessagingClient,
  "useFactory": (config: ConfigService,
                 logger: LoggingService,
                 messagingService: MessagingService,
                 localStorageMessagingClient: LocalStorageMessagingClient
               ): Promise<IMessagingClient> =>
    messagingClientFactory(
      config,
      logger,
      messagingService,
       localStorageMessagingClient),
  "inject": [
    ConfigService,
    LoggingService,
    MessagingService,
    LocalStorageMessagingClient
  ],
};

async function messagingClientFactory(
  config: ConfigService,
  logger: LoggingService,
  messagingService: MessagingService,
  localStorageMessagingClient: LocalStorageMessagingClient
): Promise<IMessagingClient> {

  messagingService.init(localStorageMessagingClient);

  return {
    publish: async (queue: string, message: string): Promise<string> => {
      return messagingService.publish(queue, message);
    },
    subscribe: async (queue: string, handler: (message: string) => Promise<void>): Promise<string> => {
      return messagingService.subscribe(queue, handler);
    },
    unsubscribe: async (uuid: string): Promise<void> => {
      return messagingService.unsubscribe(uuid);
    },
    getLastMessages: async (queue: string, count: number, status: MessagesStatuses | undefined): Promise<Map<string, string>> => {
      return messagingService.getLastMessages(queue, count, status);
    },
    setMessageStatus: async (uuid: string, status: MessagesStatuses): Promise<void> => {
      return messagingService.setMessageStatus(uuid, status);
    }
  } as IMessagingClient;
}
