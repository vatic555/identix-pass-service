import {IVcScheme, IVcSchemesClient, IVcSearchParams} from "@/libs/vc-brokerage/components/vc-schemes/types";

export class VcSchemesClientService implements IVcSchemesClient {
  private readonly vcSchemesStorage: Set<IVcScheme>;

  constructor(vcSchemesStorage: Set<IVcScheme>) {
    this.vcSchemesStorage = vcSchemesStorage;
  }

  getSchemes(params?: IVcSearchParams|undefined): IVcScheme[] {
    const {vcTypeDid, key} = params || {};

    if (vcTypeDid && key) {
      return Array.from(this.vcSchemesStorage).filter(scheme => scheme.did === vcTypeDid && scheme.key === key);
    }

    if (vcTypeDid) {
      return Array.from(this.vcSchemesStorage).filter(scheme => scheme.did === vcTypeDid);
    }

    if (key) {
      return Array.from(this.vcSchemesStorage).filter(scheme => scheme.key === key);
    }

    return Array.from(this.vcSchemesStorage);
  }
}
