import {KeyValueType} from "@/libs/common/types";
import {get} from "@/libs/common/helpers/object.helpers";

export function credentialSubjectStateId(holderDid: string, params: KeyValueType): KeyValueType {
  return {
    "groups": [
      {
        "id": "names",
        "claims": [
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/has_first_name",
            "object": get(params, 'firstName')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/has_middle_name",
            "object": ''
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/has_last_name",
            "object": get(params, 'lastName')
          }
        ],
        "signature": ""
      },
      {
        "id": "birth",
        "claims": [
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/was_born_on",
            "object": get(params, 'dateOfBirth')
          }
        ],
        "signature": ""
      },
      {
        "id": "citizenship",
        "claims": [
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/officials/is_citizen_of",
            "object": get(params, 'citizenship')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/officials/has_citizenship_document_of_type",
            "object": 'passport'
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/officials/issuing_body",
            "object": get(params, 'id')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/officials/issuance_date",
            "object": get(params, 'dateOfIssuance')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/core/officials/expiry_date",
            "object": get(params, 'dateOfExpiry')
          }
        ],
        "signature": ""
      }
    ]
  };
}

export function credentialSubjectProofOfResidency(holderDid: string, params: KeyValueType): KeyValueType {
  return {
    "groups": [
      {
        "id": "main",
        "claims": [
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/officials/is_resident_of_countrye",
            "object": get(params, 'country')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/officials/is_resident_of_city",
            "object": get(params, 'city')
          },
          {
            "subject": holderDid,
            "predicate": "did:identixschemas/officials/is_resident_of_address",
            "object": get(params, 'address')
          }
        ],
        "signature": ""
      }
    ]
  };
}
