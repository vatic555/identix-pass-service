import {Field, ObjectType, registerEnumType, ArgsType, Int} from "@nestjs/graphql";
import {EventTypes} from "@/libs/database/types/event-types.type";

export interface VCData {
  [key: string]: string | number | boolean | VCData | VCData[] | null;
}

export enum VerificationStatuses {
  PENDING_VERIFY = "PENDING_VERIFY",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

registerEnumType(VerificationStatuses, {
  name: 'VerificationStatuses',
});

export type Did = string;

export interface IVcSchema {
  did: Did,
  schema: string
}

export interface IVcMessage {
  did: string;
  message: string;
}
export interface IIssueVcProperties {
  [key: string]: IIssueVcProperties
}

export enum AgentsRoles {
  issuer = 'ISSUER',
  holder = 'HOLDER',
  verifier = 'VERIFIER',
}

registerEnumType(AgentsRoles, {
  name: 'AgentsRoles',
});

@ObjectType()
export class EventLogEntry {
  @Field(type => Int)
  id: number;

  @Field({nullable: false})
  public ownerDid: string;

  @Field({nullable: false})
  public eventType: EventTypes;

  @Field({nullable: false})
  public vcDid: string;

  @Field({nullable: false})
  public message: string;

  @Field({nullable: false})
  public eventDate: Date;
}

@ObjectType()
export class VerificationCase {
  @Field(type => String)
  verifierDid: Did;

  @Field(type => VerificationStatuses)
  verificationStatus: VerificationStatuses
}

@ObjectType()
export class VC {
  @Field(type => String)
  vcDid: Did;

  @Field(type => String)
  vcTypeDid: Did;

  @Field(type => String)
  vcParams: string; // Serialized JSON key-value struct

  @Field(type => String)
  vcRawText: string; // Serialized JSON struct incl signatures, JWT

  @Field(type => String)
  issuerDid: Did;

  @Field(type => String)
  holderDid: Did;

  @Field(type => String)
  createdAt: string;

  @Field(type => String)
  updatedAt: string;

  @Field(type => [VerificationCase])
  verificationCases: Array<{
    verifierDid: Did,
    verificationStatus: VerificationStatuses
  }>
}
