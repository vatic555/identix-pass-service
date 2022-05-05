import {registerEnumType} from "@nestjs/graphql";

export enum EventTypes {
  ISSUER_VC= 'ISSUER_VC',
  REQUEST_VC_VERIFICATION = 'REQUEST_VC_VERIFICATION',
  VERIFICATED = 'VERIFICATED'
}

registerEnumType(EventTypes, {
  name: 'EventTypes',
});
