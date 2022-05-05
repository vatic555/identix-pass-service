import { join } from 'path';
import { registerAs } from '@nestjs/config';

import { ConnectionOptions } from './types/connection.type';

export default registerAs('app-database', (): ConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  keepConnectionAlive: true,
  synchronize: false,
  logging: true,
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  entities: [join(__dirname, '/entities/**/*{.ts,.js}')],
  factories: [join(__dirname, '/seed-factories/**/*{.ts,.js}')],
  seeds: [join(__dirname, '/seeds/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/libs/database/entities',
    migrationsDir: 'src/libs/database/migrations'
  }
}));
