const { join } = require("path");

require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || '5432',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '12345678',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  keepConnectionAlive: true,
  synchronize: false,
  logging: true,
  migrations: [join(__dirname, '/src/libs/database/migrations/**/*{.ts,.js}')],
  entities: [join(__dirname, '/src/libs/database/entities/**/*{.ts,.js}')],
  factories: [join(__dirname, '/src/libs/database/seed-factories/**/*{.ts,.js}')],
  seeds: [join(__dirname, '/src/libs/database/seeds/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/libs/database/entities',
    migrationsDir: 'src/libs/database/migrations'
  }
}