import {PassportModule} from '@nestjs/passport';
import {Module} from '@nestjs/common';

import {AuthenticationService} from './services/authentication.service';
import {SsoStrategy} from './strategies';
import {SsoClientModule} from "@/libs/sso-client/sso-client.module";
import {AgentsSessionsRegistryModule} from "@/libs/vc-brokerage/components/agents-sessions-registry/agents-sessions-registry.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'sso' }),
    SsoClientModule,
    AgentsSessionsRegistryModule
  ],
  providers: [AuthenticationService, SsoStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {
}
