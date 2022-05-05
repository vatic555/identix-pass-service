import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import * as entities from '../entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public constructor(
    protected configService: ConfigService
  ) {}

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...this.configService.get<ConnectionOptions>('dapp-docs-registry-database'),
      entities: Object.values(entities)
    };
  }
}
