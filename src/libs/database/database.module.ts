import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import databaseSettings from './database-factory';
import { TypeOrmConfigService } from './providers/database-provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forFeature(databaseSettings)
      ],
      useClass: TypeOrmConfigService
    }),
  ],
  exports: [ TypeOrmModule ],
})
export class DatabaseModule {}
