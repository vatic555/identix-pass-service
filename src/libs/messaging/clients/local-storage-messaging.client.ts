import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MqStorageEntity} from "@/libs/database/entities";
import {Repository} from "typeorm";
import {IMessagingClient, MessagesStatuses} from "@/libs/messaging/types";

type SubscriberHandler = (massage: string) => Promise<void>;

@Injectable()
export class LocalStorageMessagingClient implements IMessagingClient {
  private readonly subscribers: Map<string, SubscriberHandler[]>

  constructor(@InjectRepository(MqStorageEntity)
              private mqStorageRepository: Repository<MqStorageEntity>) {}

  async publish(queue: string, message: string): Promise<string> {
    return;
  }

  async subscribe(queue: string, handler: (message: string) => Promise<void>): Promise<string> {
    return;
  }

  async unsubscribe(uuid: string): Promise<void> {
    return;
  }

  async getLastMessages(queue: string, count: number, status: MessagesStatuses | undefined): Promise<Map<string, string>> {
    return;
  }

  async setMessageStatus (uuid: string, status: MessagesStatuses): Promise<void> {
    return;
  }
}
