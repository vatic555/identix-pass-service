import { Did } from '@/libs/vc-brokerage/types';
import { Field, ObjectType } from "@nestjs/graphql";

export const MessagingClient = 'MESSAGING_CLIENT';

export enum MessagesStatuses {
  unprocessed = 'UNPROCESSED',
  processed = 'PROCESSED'
}

export interface IMessagingClient {
  publish: (queue: string, message: string) => Promise<string>; // returns message uuid
  subscribe: (queue: string, handler: (message: string) => Promise<void>) => Promise<string>; //returns subscriber uuid
  unsubscribe: (uuid: string) => Promise<void>; //gets uuid subscriber
  getLastMessages: (queue: string, count: number, status?: MessagesStatuses) => Promise<Map<string, string>>; // returns Map<message uuid, message>
  setMessageStatus: (uuid: string, status: MessagesStatuses) => Promise<void>;
}

export enum IMessagesProcessingStatuses {
  notDelivered = 'NOT_DELIVERED',
  delivered = 'DELIVERED',
  processed = 'PROCESSED'
}

export type IMessageContext = {
  vcDid: Did;
  operation: string;
}

export interface IMessage {
  sender: Did;
  recipient: Did;
  message: string;
  context?: IMessageContext;
  status: IMessagesProcessingStatuses
}

@ObjectType()
class MessageContext implements IMessageContext {
  @Field(type => String)
  vcDid: Did;

  @Field(type => String)
  operation: string;
}

@ObjectType()
export class Message implements IMessage {
  @Field(type => String)
  sender: Did;

  @Field(type => String)
  recipient: Did;

  @Field(type => String)
  message: string;

  @Field(type => String, { nullable: true })
  context?: IMessageContext;

  @Field(type => String)
  status: IMessagesProcessingStatuses
}
