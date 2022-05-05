import {Did} from "@/libs/vc-brokerage/types";

export const VcSchemesClient = "VC_SCHEMES_CLIENT";

export interface IJsonScheme {
  [key: string]: string | number | boolean | null | IJsonScheme | IJsonScheme[]
}

export interface IVcScheme {
  did: Did,
  key: string,
  description: string,
  scheme: IJsonScheme
}

export interface IVcSearchParams {
  userDid?: Did,
  vcTypeDid?: Did,
  key?: string
}

export interface IVcSchemesClient {
  getSchemes: (params?: IVcSearchParams | undefined) => IVcScheme[];
}
