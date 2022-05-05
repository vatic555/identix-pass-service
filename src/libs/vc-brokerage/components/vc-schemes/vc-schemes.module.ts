import {Module} from '@nestjs/common';

import {LoggingModule} from "@/libs/logging/logging.module";
import {VcSchemesClientProvider} from "./providers/vc-schemes-client.provider";
import {VcSchemesClientService} from "./services/vc-schemes-client.service";

@Module({
    imports: [
        LoggingModule.forRoot({serviceName: 'VC Schemes module'})
    ],
    providers: [VcSchemesClientProvider, VcSchemesClientService],
    exports: [VcSchemesClientProvider]
})
export class VcSchemesModule {}
