import {Test, TestingModule} from '@nestjs/testing';

import {LocalStorageMessagingClient} from './local-storage-messaging.client';
import {Repository} from "typeorm";
import {MqStorageEntity} from "@/libs/database/entities";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('LocalStorageMessagingClient', () => {
  let localStorageMessagingClient: LocalStorageMessagingClient;
  let mqStorageRepositoryMock: Repository<MqStorageEntity>;
  const mqStorageRepositoryToken = getRepositoryToken(MqStorageEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: mqStorageRepositoryToken,
          useValue: {
            findOne: () => ({}),
            save: () => ({}),
          },
        },
        LocalStorageMessagingClient
      ],
    }).compile();

    localStorageMessagingClient = module.get<LocalStorageMessagingClient>(LocalStorageMessagingClient);
    mqStorageRepositoryMock = module.get(mqStorageRepositoryToken);
  });

  it('should be defined', () => {
    expect(localStorageMessagingClient).toBeDefined();
    expect(mqStorageRepositoryMock).toBeDefined();
  });
});
