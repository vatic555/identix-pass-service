import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from '@/libs/database/entities';
import { UsersGraphqlApiService } from './users.graphql-api.service';

describe('UsersService', () => {
  let service: UsersGraphqlApiService;
  let usersRepositoryMock: Repository<UsersEntity>;
  const usersRepositoryToken = getRepositoryToken(UsersEntity);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: usersRepositoryToken,
          useValue: {
            findOne: () => ({}),
            save: () => ({}),
          },
        },
        UsersGraphqlApiService
      ],
    }).compile();

    service = module.get<UsersGraphqlApiService>(UsersGraphqlApiService);
    usersRepositoryMock = module.get(usersRepositoryToken);

    jest.clearAllMocks();
  });

  describe('services', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(usersRepositoryMock).toBeDefined();
    });
  });
});
