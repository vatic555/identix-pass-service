import {BadRequestException, Injectable} from '@nestjs/common';
import {IMessagingClient, MessagesStatuses} from "@/libs/messaging/types";

@Injectable()
export class MessagingService {
  private mqClient: IMessagingClient;

  init(mqClient: IMessagingClient): void {
    this.mqClient = mqClient;
  }

  async publish(queue: string, message: string): Promise<string> {
    if (!this.mqClient) {
      throw new BadRequestException('MQ Client is undefined');
    }

    return this.mqClient.publish(queue, message);
  }

  async subscribe (queue: string, handler: (message: string) => Promise<void>): Promise<string> {
    if (!this.mqClient) {
      throw new BadRequestException('MQ Client is undefined');
    }

    return this.mqClient.subscribe(queue, handler);
  }

  async unsubscribe(uuid: string): Promise<void> {
    if (!this.mqClient) {
      throw new BadRequestException('MQ Client is undefined');
    }

    return this.mqClient.unsubscribe(uuid);
  }

  async getLastMessages(queue: string, count: number, status: MessagesStatuses | undefined): Promise<Map<string, string>> {
    if (!this.mqClient) {
      throw new BadRequestException('MQ Client is undefined');
    }

    return this.mqClient.getLastMessages(queue, count, status);
  }

  async setMessageStatus (uuid: string, status: MessagesStatuses): Promise<void> {
    if (!this.mqClient) {
      throw new BadRequestException('MQ Client is undefined');
    }

    return this.mqClient.setMessageStatus(uuid, status);
  }

}
