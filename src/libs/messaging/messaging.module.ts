import {Module} from '@nestjs/common';

import {LoggingModule} from "@/libs/logging/logging.module";
import {MessagingService} from "@/libs/messaging/services/messaging.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MqStorageEntity} from "@/libs/database/entities";
import {LocalStorageMessagingClient} from "@/libs/messaging/clients/local-storage-messaging.client";
import {MessagingClientProvider} from "@/libs/messaging/providers/messaging-client.provider";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([MqStorageEntity]),
    LoggingModule.forRoot({serviceName: 'Messaging module'})
  ],
  providers: [LocalStorageMessagingClient, MessagingService, MessagingClientProvider],
  exports: [MessagingClientProvider]
})
export class MessagingModule {}
