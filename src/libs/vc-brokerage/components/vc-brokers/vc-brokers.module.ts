import {Module} from '@nestjs/common';

import {LoggingModule} from "@/libs/logging/logging.module";
import {SimpleBrokerService} from "@/libs/vc-brokerage/components/vc-brokers/services/simple-broker.service";
import {VcBrokersProvider} from "@/libs/vc-brokerage/components/vc-brokers/providers/vc-brokers.provider";
import {ConfigModule} from "@nestjs/config";
import {MessagingModule} from "@/libs/messaging/messaging.module";
import {WalletsSrorageClientModule} from "@/libs/wallets-storage-client/wallets-srorage-client.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        LoggingModule.forRoot({serviceName: 'VC Broker module'}),
        MessagingModule,
        WalletsSrorageClientModule
    ],
    providers: [VcBrokersProvider, SimpleBrokerService],
    exports: [VcBrokersProvider]
})
export class BrokersModule {}
