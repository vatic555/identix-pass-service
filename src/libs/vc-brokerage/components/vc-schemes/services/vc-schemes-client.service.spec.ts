import {VcSchemesClientService} from './vc-schemes-client.service';
import {IVcScheme} from "@/libs/vc-brokerage/components/vc-schemes/types";

describe('BrokerService', () => {
  let service: VcSchemesClientService;
  const vcStorageMock: Set<IVcScheme> = new Set<IVcScheme>();

  beforeAll(() => {
    const vcScheme1 = {
      "did": "did:vc-scheme:123456",
      "key": "SCHEME_1",
      "description": "scheme 1",
      "scheme": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/product.schema.json",
        "title": "Product",
        "description": "A product in the catalog",
        "type": "object"
      }
    };
    const vcScheme2 = {
      "did": "did:vc-scheme:6534341",
      "key": "SCHEME_2",
      "description": "scheme 2",
      "scheme": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://example.com/product.schema.json",
        "title": "Product",
        "description": "A product in the catalog",
        "type": "object"
      }
    }

    vcStorageMock.add(vcScheme1);
    vcStorageMock.add(vcScheme2);

    service = new VcSchemesClientService(vcStorageMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getSchemes() => params is undefined', () => {
    const result = service.getSchemes();

    expect(result).toBeDefined();
    expect(result.length).toBe(2);
  });

  it('getSchemes() => search by did', () => {
    const result = service.getSchemes({vcTypeDid: 'did:vc-scheme:123456'});

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].key).toBe('SCHEME_1');
  });

  it('getSchemes() => search by key', () => {
    const result = service.getSchemes({key: 'SCHEME_2'});

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].did).toBe('did:vc-scheme:6534341');
  });
});
