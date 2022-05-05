import {Test, TestingModule} from '@nestjs/testing';

import {WalletsStorageService} from './wallets-storage-client.service';
import {VCData} from "@/libs/vc-brokerage/types";
import {BaseStorageWalletsClient} from "@/libs/wallets-storage-client/clients/base-storage-wallets.client";

describe('WalletsStorageService', () => {
  let service: WalletsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BaseStorageWalletsClient,
          useValue: {
            createVC: (did: string, vcData: VCData) => { return 'did'; }
          }
        },
        WalletsStorageService
      ],
    }).compile();

    service = module.get<WalletsStorageService>(WalletsStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createVC(): result should be defined', async () => {
    const vcParamsObj = {property1: "value1", property2: "value2"};
    const result =
      await service.saveVC(
        'test:did:123456',
        'did:ever:23123',
        'did:ever:453',
        JSON.stringify(vcParamsObj),
        'secret'
      );
    expect(result).toBeDefined();
  });
});
