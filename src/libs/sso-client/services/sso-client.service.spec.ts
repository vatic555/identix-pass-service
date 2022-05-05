import {Test, TestingModule} from '@nestjs/testing';

import {SsoService} from "identix-sso-client-js";
import {SsoClientService} from './sso-client.service';

describe('SsoClientService', () => {
  let service: SsoClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SsoClientService
      ],
    }).compile();

    service = module.get<SsoClientService>(SsoClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registerSession(): result should be defined', async () => {
    const ssoServiceMock = {} as SsoService;
    service.init(ssoServiceMock);

    const result = await service.registerSession('client:did:123456');
    expect(result).toBeDefined();
  });

  it('validateUserSession(): result should be defined', async () => {
    const ssoServiceMock = {} as SsoService;
    service.init(ssoServiceMock);

    const result = await service.validateUserSession('client:did:123456', 'user:did:54321');
    expect(result).toBeDefined();
  });
});
