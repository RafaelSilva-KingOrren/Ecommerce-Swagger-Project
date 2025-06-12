import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: './.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dropSchema: false,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*{.ts,.js}'],
  // migrationsTableName: 'migrations',
};

export default registerAs('typeorm', () => config);
