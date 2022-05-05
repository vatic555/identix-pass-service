import { Test } from '@nestjs/testing';
import {VCBrokerageGraphqlApiService} from "@/modules/graphql-api/vc-brokerage/services/vc-brokerage.graphql-api.service";

describe('VCBrokerageGraphqlAPIService', () => {
  let service: VCBrokerageGraphqlApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        VCBrokerageGraphqlApiService
      ],
    }).compile();

    service = module.get<VCBrokerageGraphqlApiService>(VCBrokerageGraphqlApiService);

    jest.clearAllMocks();
  });

  describe('services', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
