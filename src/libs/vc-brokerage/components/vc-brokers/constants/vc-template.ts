export const vcTemplate = {
  "$schema": "https://schemas.identix.space/vc/vc_jwt_v1",
  "header":
    {
      "typ": "JWT",
      "alg": "ES256"
    },
  "payload":
    {
      "iss": "did.ever.issuer200",
      "aud": [ "did:ever:verifiers300" ],
      "nbf": "1541893810",
      "iat": "1541493724",
      "jti": "did.ever.vc123",
      "vc":
        {
          "@context":[ "https://www.w3.org/2018/credentials/v1" ],
          "id": "did.ever.vc123",
          "type":
            [
              "VerifiableCredential",
              "IdentixVerifiableCredential"
            ],
          "credentialSubject": {}
        }
    },
  "jwt": "hhh.ppp.sss"
}
