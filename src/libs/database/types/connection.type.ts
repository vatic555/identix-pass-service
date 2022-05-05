import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const dbConnectionName = 'DB_CONNECTION';
export type ConnectionOptions = TypeOrmModuleOptions & {
  factories?: string[];
  seeds?: string[];
};
