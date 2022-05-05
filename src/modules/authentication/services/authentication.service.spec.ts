import {Test, TestingModule} from '@nestjs/testing';

import {AuthenticationService} from './authentication.service';
import {SSOClient} from "@/libs/sso-client/types";

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: SSOClient,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
