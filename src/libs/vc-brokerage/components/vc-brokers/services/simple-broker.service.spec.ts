import {Test, TestingModule} from '@nestjs/testing';

import {SimpleBrokerService} from './simple-broker.service';

describe('BrokerService', () => {
  let service: SimpleBrokerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimpleBrokerService
      ],
    }).compile();

    service = module.get<SimpleBrokerService>(SimpleBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
