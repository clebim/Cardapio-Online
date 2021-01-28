/* eslint-disable radix */

import { ConnectionOptions } from 'typeorm';

export const defaultConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./src/Database/Migrations/*.ts'],
  entities: ['./src/App/Http/Entities/*.ts'],
  cli: {
    migrationsDir: './src/Database/Migrations',
  },
};

export const testConfig: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.DB_DATABASE as string,
  migrations: ['./src/Database/Migrations/*.ts'],
  entities: ['./src/App/Http/Entities/*.ts'],
  cli: {
    migrationsDir: './src/Database/Migrations',
  },
};
